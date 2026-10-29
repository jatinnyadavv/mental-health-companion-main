import json
import logging
from typing import Tuple
from ..config import settings, BUDGET_FALLBACK, LLM_ERROR_FALLBACK, CRISIS_REPLY
from .prompts import SYSTEM_PROMPT
from .. import db

logger = logging.getLogger(__name__)

# Lazily initialized genai client
_genai_client = None

def get_genai_client():
    global _genai_client
    if _genai_client is None:
        if settings.gemini_api_key:
            from google import genai
            from google.genai import types

            _genai_client = genai.Client(
                api_key=settings.gemini_api_key,
                http_options=types.HttpOptions(
                    timeout=settings.gemini_timeout_ms,
                    retry_options=types.HttpRetryOptions(attempts=1),
                ),
            )
    return _genai_client

def set_genai_client(mock_client):
    """Allows mocking in unit tests."""
    global _genai_client
    _genai_client = mock_client

def call_gemini_chat(messages: list[dict]) -> Tuple[str, bool, int]:
    """
    Calls Gemini API with the last messages, enforcing budget and safety parsing.
    Returns: (reply_text, is_crisis, remaining_calls)
    """
    current_calls = db.get_llm_calls()
    remaining = max(0, settings.max_llm_calls - current_calls)

    if remaining <= 0:
        return BUDGET_FALLBACK, False, 0

    client = get_genai_client()
    if client is None:
        return LLM_ERROR_FALLBACK, False, remaining

    # Send only the last 10 messages
    recent_messages = messages[-10:]
    
    # Format messages for google-genai SDK
    # Google GenAI uses contents formatted with parts/role: "user" or "model"
    formatted_contents = []
    for msg in recent_messages:
        role = "user" if msg.get("role") == "user" else "model"
        content = msg.get("content", "")
        if content:
            formatted_contents.append({"role": role, "parts": [{"text": content}]})

    # Ensure conversation starts with a user turn
    while formatted_contents and formatted_contents[0]["role"] != "user":
        formatted_contents.pop(0)

    # Fallback to ensure at least the latest user message is sent
    if not formatted_contents and messages:
        last_user = next((m for m in reversed(messages) if m.get("role") == "user"), None)
        if last_user and last_user.get("content"):
            formatted_contents.append({"role": "user", "parts": [{"text": last_user["content"]}]})

    # Merge consecutive turns with identical roles to ensure valid turn alternation
    merged_contents = []
    for turn in formatted_contents:
        if merged_contents and merged_contents[-1]["role"] == turn["role"]:
            merged_contents[-1]["parts"].extend(turn["parts"])
        else:
            merged_contents.append(turn)
    formatted_contents = merged_contents

    try:
        from google.genai import types

        config = types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            max_output_tokens=512,
            response_mime_type="application/json",
            thinking_config=types.ThinkingConfig(thinking_level="minimal"),
        )

        response = client.models.generate_content(
            model=settings.gemini_model,
            contents=formatted_contents,
            config=config,
        )
        raw_response_text = response.text.strip() if response.text else ""
    except Exception as e:
        # Do not log exception text: SDK errors can contain request details.
        logger.warning("Gemini API call failed (%s)", type(e).__name__)
        return LLM_ERROR_FALLBACK, False, remaining

    # Account for the successful call
    new_total = db.increment_llm_calls()
    remaining = max(0, settings.max_llm_calls - new_total)

    # Parse JSON output {reply, risk}
    try:
        # Strip potential markdown backticks ```json ... ```
        clean_text = raw_response_text
        if clean_text.startswith("```"):
            clean_text = clean_text.strip("`")
            if clean_text.startswith("json"):
                clean_text = clean_text[4:].strip()
        data = json.loads(clean_text)
        reply = data.get("reply", "")
        risk = data.get("risk", "none").lower()
        
        if risk == "crisis":
            return CRISIS_REPLY, True, remaining
        
        return reply, False, remaining
    except Exception as e:
        logger.info("Gemini returned invalid JSON (%s)", type(e).__name__)
        # Raw text fallback
        if raw_response_text:
            return raw_response_text, False, remaining
        return LLM_ERROR_FALLBACK, False, remaining
