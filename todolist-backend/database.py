# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite 檔案路徑，會在專案目錄產生 todo.db 檔案
SQLALCHEMY_DATABASE_URL = "sqlite:///./todo.db"

# connect_args 這設定是 SQLite 特別需要的（避免多執行緒問題）
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()