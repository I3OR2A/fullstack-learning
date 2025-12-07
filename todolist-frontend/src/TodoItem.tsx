// TodoItem.tsx

function TodoItem({ text, onDelete }) {
  // props: text = 待辦文字, onDelete = 父層傳進來的刪除函式

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
