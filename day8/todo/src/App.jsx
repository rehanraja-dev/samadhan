import React, { useEffect, useState } from "react";

export default function App() {
  const [newTask, setNewTask] = useState("");
  const [todos, setTodos] = useState([]);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem("todos_v1");
      if (raw) setTodos(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to load todos", e);
    }
  }, []);

  // save
  useEffect(() => {
    try {
      localStorage.setItem("todos_v1", JSON.stringify(todos));
    } catch (e) {
      console.warn("Failed to save todos", e);
    }
  }, [todos]);

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    const todo = {
      id: Date.now() + Math.random(),
      text,
      completed: false,
      isEditing: false,
      editText: text,
    };
    setTodos((t) => [todo, ...t]);
    setNewTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  const deleteTask = (id) => setTodos((t) => t.filter((x) => x.id !== id));
  const toggleComplete = (id) =>
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x)));
  const startEdit = (id) => setTodos((t) => t.map((x) => (x.id === id ? { ...x, isEditing: true, editText: x.text } : x)));
  const cancelEdit = (id) => setTodos((t) => t.map((x) => (x.id === id ? { ...x, isEditing: false, editText: x.text } : x)));
  const changeEditText = (id, text) => setTodos((t) => t.map((x) => (x.id === id ? { ...x, editText: text } : x)));
  const saveEdit = (id) =>
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, text: x.editText.trim() || x.text, isEditing: false } : x)));

  return (
    <div className="todo-root">
      <style>{`
        /* Reset & layout */
        html,body,#root {height:100%; margin:0; padding:0; background: #f7fafc; color: #0f172a; font-family: Inter, Roboto, -apple-system, 'Segoe UI', sans-serif;}
        * { box-sizing: border-box; }

        /* ensure no horizontal overflow (prevents black / empty strip on right) */
        body, .todo-root { overflow-x: hidden; }

        /* full-bleed card that covers full width of viewport */
        .todo-root { min-height: 100vh; width: 100vw; display: block; }
        .card { width: 100vw; min-height: 100vh; margin: 0; padding: 28px 48px; background: #ffffff; border-radius: 0; box-shadow: none; }

        /* header */
        .header { display:flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
        .title { font-size: 20px; font-weight: 700; color: #0f172a; }
        .subtitle { font-size: 13px; color: #475569; }

        /* input */
        .input-row { display:flex; gap:10px; margin: 12px 0 18px; }
        .task-input {
          flex:1;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          outline: none;
          font-size: 15px;
          background: #ffffff;
          color: #000000;            /* <- explicit black text in input */
          caret-color: #0f172a;
        }
        .task-input::placeholder { color: #94a3b8; }
        .task-input:focus { box-shadow: 0 0 0 4px rgba(99,102,241,0.06); border-color: #6366f1; }

        .add-btn {
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          background: #2563eb;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }
        .add-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* list */
        .list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .item {
          display:flex;
          align-items:center;
          gap:12px;
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #eef2ff;
          background: #ffffff;
        }
        .item:hover { box-shadow: 0 6px 18px rgba(2,6,23,0.04); }

        .left { display:flex; align-items:center; gap:12px; flex:1; }
        .checkbox {
          width:18px; height:18px; border-radius:6px; border:2px solid #c7d2fe;
          display:inline-flex; align-items:center; justify-content:center; cursor:pointer;
          background: #ffffff; color: #ffffff;
        }
        .checkbox.checked { background: #4f46e5; border-color: #4f46e5; color: white; }

        .text { font-size:15px; color: #0f172a; }
        .text.completed { text-decoration: line-through; color: #64748b; opacity: 0.85; }

        .controls { display:flex; gap:8px; }
        .btn { padding:6px 8px; border-radius:8px; border:none; background:transparent; cursor:pointer; font-weight:600; }
        .btn.icon { font-size:14px; }

        .edit-input { flex:1; padding:8px 10px; border-radius:8px; border:1px solid #e6eefc; color: #000000; background:#fff; }

        .empty { padding:18px; text-align:center; color:#64748b; }
        .primary {background-color: black}

        /* responsive padding */
        @media (max-width: 900px) {
          .card { padding: 18px 20px; }
        }
        @media (max-width: 520px) {
          .card { padding: 12px 12px; }
        }
      `}</style>

      <div className="card">
        <div className="header">
          <div>
            <div className="title">Todo List</div>
          </div>
        </div>

        <div className="input-row">
          <input
            className="task-input"
            placeholder="Add a new task and press Enter or click Add"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="New task"
          />
          <button className="add-btn" onClick={addTask} disabled={!newTask.trim()} aria-label="Add task">
            Add
          </button>
        </div>

        <ul className="list">
          {todos.length === 0 && <div className="empty">No tasks yet — add your first task ✨</div>}

          {todos.map((todo) => (
            <li
              className="item"
              key={todo.id}
              onDoubleClick={() => startEdit(todo.id)}
              title="Double-click to edit"
            >
              <div className="left">
                <div
                  role="button"
                  tabIndex={0}
                  className={"checkbox " + (todo.completed ? "checked" : "")}
                  onClick={() => toggleComplete(todo.id)}
                  onKeyDown={(e) => e.key === "Enter" && toggleComplete(todo.id)}
                  aria-label={todo.completed ? "Mark as not completed" : "Mark as completed"}
                >
                  {todo.completed ? "✓" : ""}
                </div>

                {todo.isEditing ? (
                  <input
                    className="edit-input"
                    value={todo.editText}
                    onChange={(e) => changeEditText(todo.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(todo.id);
                      if (e.key === "Escape") cancelEdit(todo.id);
                    }}
                    autoFocus
                    aria-label="Edit task"
                  />
                ) : (
                  <div className={"text " + (todo.completed ? "completed" : "")}>{todo.text}</div>
                )}
              </div>

              <div className="controls">
                {todo.isEditing ? (
                  <>
                    <button className="btn primary" onClick={() => saveEdit(todo.id)} aria-label="Save edit">Save</button>
                    <button className="btn primary" onClick={() => cancelEdit(todo.id)} aria-label="Cancel edit">Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn icon" onClick={() => startEdit(todo.id)} aria-label="Edit task">✏️</button>
                    <button className="btn icon" onClick={() => deleteTask(todo.id)} aria-label="Delete task">🗑️</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
