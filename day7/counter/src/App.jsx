import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="app">
      <h1>React Counter</h1>
      <h2>Count: {count}</h2>
      <div className="buttons">
        <button onClick={increment}>➕ Increment</button>
        <button onClick={decrement}>➖ Decrement</button>
        <button onClick={reset}>🔄 Reset</button>
      </div>
    </div>
  );
}

export default App;
