// src/TodoItem.jsx
function TodoItem({ text, isDone, createdAt, onDelete, onToggle }) {
  // 建立時間可以簡單處理一下顯示格式
  const created = new Date(createdAt);

  return (
    <div
      style={{
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {/* 勾選框 */}
      <input type="checkbox" checked={isDone} onChange={onToggle} />

      {/* 顯示文字，完成時加刪除線 */}
      <span
        style={{
          textDecoration: isDone ? "line-through" : "none",
          color: isDone ? "#888" : "#000",
          flex: 1,
        }}
      >
        {text}
      </span>

      {/* 建立時間（簡單顯示） */}
      <span style={{ fontSize: 12, color: "#666" }}>
        {created.toLocaleString()}
      </span>

      {/* 刪除按鈕 */}
      <button onClick={onDelete}>刪除</button>
    </div>
  );
}

export default TodoItem;
