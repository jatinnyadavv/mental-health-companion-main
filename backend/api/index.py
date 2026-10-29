"""Vercel serverless entry point for the FastAPI backend."""
from app.main import app  # noqa: F401  – Vercel imports `app` from this module
