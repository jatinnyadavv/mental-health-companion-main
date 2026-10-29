from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .db import init_db
from .routers import predict, chat, history, me

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize persistence. The ML model loads only when /predict needs it,
    # so chat and history requests avoid paying its cold-start cost.
    init_db()
    yield
    # Shutdown

app = FastAPI(
    title="Mental Health Companion API",
    version="1.0.0",
    description="Backend API for student wellbeing companion with ML predictions and Gemini chat",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins if settings.cors_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health endpoint (no auth/session required)
@app.get("/health")
def health():
    return {"status": "ok"}

# Register routers
app.include_router(predict.router)
app.include_router(chat.router)
app.include_router(history.router)
app.include_router(me.router)
