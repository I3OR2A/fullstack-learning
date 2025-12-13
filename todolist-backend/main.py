# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from database import SessionLocal, engine
from models import Base, Todo
from sqlalchemy.orm import Session

app = FastAPI()

# 讓前端 React (http://localhost:5173) 可以呼叫這個 API（CORS 設定）
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # 允許哪些網域
    allow_credentials=True,
    allow_methods=["*"],            # 允許所有 HTTP 方法：GET/POST/DELETE...
    allow_headers=["*"],
)


# ✅ 啟動時建立資料表（如果不存在）
Base.metadata.create_all(bind=engine)


# ---------- Pydantic Models（給 API 用） ----------

class TodoCreate(BaseModel):
    text: str

class TodoItem(BaseModel):
    id: int
    text: str

    class Config:
        orm_mode = True  # 讓 FastAPI 可以把 ORM 物件轉成這個 Pydantic model


# ---------- 取得 DB Session 的 Dependency ----------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- API Endpoints ----------

@app.get("/health")
def health_check():
    return {"status": "ok"}

from sqlalchemy.orm import Session
from fastapi import Depends

@app.get("/todos", response_model=List[TodoItem])
def list_todos(db: Session = Depends(get_db)):
    todos = db.query(Todo).all()
    return todos

@app.post("/todos", response_model=TodoItem)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = Todo(text=todo.text)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)  # 取得 DB 寫入後的完整資料（包含 id）
    return db_todo

from fastapi import HTTPException

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    db.delete(db_todo)
    db.commit()
    return {"deleted_id": todo_id}
