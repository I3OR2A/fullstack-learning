import { useState } from "react";
import TodoItem from "./TodoItem";

function App() {
  const [input, setInput] = useState(""); // 輸入框的內容
  const [todos, setTodos] = useState([]); // 待辦清單陣列

  const addTodo = () => {
    const trimmed = input.trim();
    if (trimmed === "") return; // 避免空白

    // 新增一筆 todo 到陣列
    setTodos([...todos, trimmed]);
    setInput(""); // 清空輸入框
  };

  const removeTodo = (index) => {
    // 依照 index 移除一筆
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>ToDo List</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入待辦事項"
      />
      <button onClick={addTodo} style={{ marginLeft: 8 }}>
        新增
      </button>

      <div style={{ marginTop: 16 }}>
        {todos.length === 0 && <p>目前沒有待辦事項</p>}

        {todos.map((todo, idx) => (
          <TodoItem key={idx} text={todo} onDelete={() => removeTodo(idx)} />
        ))}
      </div>
    </div>
  );
}

export default App;
