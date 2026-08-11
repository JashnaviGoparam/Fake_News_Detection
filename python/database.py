"""database.py — tiny SQLite helper that logs every prediction."""

import sqlite3
from datetime import datetime

DB_PATH = "predictions.db"


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS predictions (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                news_text   TEXT    NOT NULL,
                label       TEXT    NOT NULL,
                confidence  REAL    NOT NULL,
                created_at  TEXT    NOT NULL
            )
            """
        )


def log_prediction(text: str, label: str, confidence: float) -> None:
    with get_connection() as conn:
        conn.execute(
            "INSERT INTO predictions (news_text, label, confidence, created_at) VALUES (?, ?, ?, ?)",
            (text[:2000], label, confidence, datetime.utcnow().isoformat(timespec="seconds")),
        )


def recent_predictions(limit: int = 20):
    with get_connection() as conn:
        rows = conn.execute(
            "SELECT id, substr(news_text, 1, 120) AS snippet, label, confidence, created_at "
            "FROM predictions ORDER BY id DESC LIMIT ?",
            (limit,),
        ).fetchall()
    return [dict(r) for r in rows]
