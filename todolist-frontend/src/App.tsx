// src/App.jsx
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { fetchTodos, createTodo, deleteTodo } from "./api";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);   // 顯示 loading 狀態
  const [error, setError] = useState("");

  // 🧠 進入頁面時，載入後端的 todos
  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError(err.message || "載入失敗");
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    const trimmed = input.trim();
    if (trimmed === "") return;

    try {
      setLoading(true);
      const newTodo = await createTodo(trimmed);
      // 後端會回傳 {id, text}
      setTodos([...todos, newTodo]);
      setInput("");
    } catch (err) {
      setError(err.message || "新增失敗");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setLoading(true);
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || "刪除失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>ToDo List（已串接 FastAPI）</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>處理中...</p>}

      <input value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入待辦事項"
      />
      <button onClick={handleAddTodo} style={{ marginLeft: 8 }}>
        新增
      </button>

      <div style={{ marginTop: 16 }}>
        {todos.length === 0 && !loading && <p>目前沒有待辦事項</p>}

        {todos.map((todo) => (
          <TodoItem key={todo.id}
            text={todo.text}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
