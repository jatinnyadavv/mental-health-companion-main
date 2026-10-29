import os
from pathlib import Path
from dotenv import load_dotenv

# Base backend directory
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

class Settings:
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    gemini_model: str = os.getenv("GEMINI_MODEL") or "gemini-3.8-flash"
    max_llm_calls: int = int(os.getenv("MAX_LLM_CALLS", "50"))
    
    # CORS origins as comma-separated or list
    cors_origins_raw: str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
    cors_origins: list[str] = [origin.strip() for origin in cors_origins_raw.split(",") if origin.strip()]
    
    _raw_db_path: str = os.getenv("DATABASE_PATH", "data/app.db")
    if _raw_db_path == ":memory:" or Path(_raw_db_path).is_absolute():
        database_path: str = _raw_db_path
    else:
        # On Vercel (serverless) only /tmp is writable; fall back to it automatically
        local_path = BASE_DIR / _raw_db_path
        if not local_path.parent.exists():
            try:
                local_path.parent.mkdir(parents=True, exist_ok=True)
                database_path: str = str(local_path.resolve())
            except OSError:
                database_path: str = "/tmp/app.db"
        else:
            database_path: str = str(local_path.resolve())

    _raw_model_path: str = os.getenv("MODEL_PATH", str(BASE_DIR / "app" / "models" / "Mental_Health_Model.pkl"))
    model_path: str = _raw_model_path if Path(_raw_model_path).is_absolute() else str((BASE_DIR / _raw_model_path).resolve())

settings = Settings()

HELPLINES = {
    "Tele-MANAS (India)": "14416",
    "Tele-MANAS (toll-free alt)": "1-800-891-4416",
    "Emergency": "112",
}

CRISIS_REPLY = (
    "I'm really glad you told me, and I'm sorry it hurts this much right now. "
    "You deserve support from a real person. In India you can call Tele-MANAS at 14416, "
    "or 112 if you are in immediate danger. If you can, please reach out to someone you trust "
    "and stay with them. I'm here to listen too."
)

BUDGET_FALLBACK = (
    "I've reached my limit for this demo, so I can't chat further right now. "
    "If you need support, please reach out to someone you trust or call Tele-MANAS at 14416."
)

LLM_ERROR_FALLBACK = (
    "I'm having trouble responding right now. Please try again in a minute."
)

DISCLAIMER = "This is a habit-based estimate, not a diagnosis. Support companion, not a therapist. Not medical advice."

TOP_COUNTRIES = ['Other', 'India', 'USA', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France']

SCORE_BANDS = {
    "LOW_MAX": 5.0,
    "MODERATE_MAX": 7.0,
}
