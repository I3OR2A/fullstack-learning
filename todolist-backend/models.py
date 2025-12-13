# models.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from database import Base

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)

    # ✅ 新增：是否完成
    is_done = Column(Boolean, nullable=False, default=False)

    # ✅ 新增：建立時間
    created_at = Column(
        DateTime, nullable=False, default=datetime.utcnow
    )