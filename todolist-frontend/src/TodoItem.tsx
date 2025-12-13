// src/TodoItem.jsx
function TodoItem({ text, onDelete }) {
  return (
    <div style={{ marginTop: 8 }}>
      <span>{text}</span>
      <button onClick={onDelete} style={{ marginLeft: 8 }}>
        刪除
      </button>
    </div>
  );
}

export default TodoItem;
