// src/api.js

const BASE_URL = "http://localhost:8000";

export async function fetchTodos() {
    const res = await fetch(`${BASE_URL}/todos`);
    if (!res.ok) {
        throw new Error("取得 todos 失敗");
    }
    return res.json();
}

export async function createTodo(text) {
    const res = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if (!res.ok) {
        throw new Error("新增 todo 失敗");
    }
    return res.json();
}

export async function deleteTodo(id) {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("刪除 todo 失敗");
    }
    return res.json();
}

// 切換完成狀態
export async function toggleTodo(id) {
    const res = await fetch(`${BASE_URL}/todos/${id}/toggle`, {
        method: "PATCH",
    });
    if (!res.ok) {
        throw new Error("切換 todo 狀態失敗");
    }
    return res.json();
}