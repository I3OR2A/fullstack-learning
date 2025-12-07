import { useState } from "react";

function App() {
  // 定義一個 state，名字叫 count，預設值是 0
  const [count, setCount] = useState(0);

  // 這個 function 負責處理 +1 的邏輯
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // 這個 function 負責處理 -1 的邏輯
  const handleDecrement = () => {
    setCount(count - 1);
  };

  // 這個 function 用來重置
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>計數器 Counter</h2>
      <p>目前數字：{count}</p>

      <button onClick={handleIncrement}>+1</button>
      <button onClick={handleDecrement} style={{ marginLeft: 8 }}>
        -1
      </button>
      <button onClick={handleReset} style={{ marginLeft: 8 }}>
        重置
      </button>
    </div>
  );
}

export default App;