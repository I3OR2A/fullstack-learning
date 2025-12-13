# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

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


# ---------- 資料模型（Pydantic Model） ----------

class TodoCreate(BaseModel):
    text: str

class TodoItem(BaseModel):
    id: int
    text: str

# ---------- 模擬資料庫：放在記憶體裡 ----------

todos: List[TodoItem] = []
next_id = 1


# ---------- API Endpoints ----------

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/todos", response_model=List[TodoItem])
def list_todos():
    return todos

@app.post("/todos", response_model=TodoItem)
def create_todo(todo: TodoCreate):
    global next_id
    new_todo = TodoItem(id=next_id, text=todo.text)
    next_id += 1
    todos.append(new_todo)
    return new_todo

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    global todos
    todos = [t for t in todos if t.id != todo_id]
    return {"deleted_id": todo_id}
