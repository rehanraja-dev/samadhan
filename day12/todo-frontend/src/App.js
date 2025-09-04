import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/todos/")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    fetch("http://127.0.0.1:8000/api/todos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    })
      .then((res) => res.json())
      .then((todo) => {
        setTodos([...todos, todo]);
        setNewTodo("");
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://127.0.0.1:8000/api/todos/${id}/`, { method: "DELETE" }).then(() =>
      setTodos(todos.filter((todo) => todo.id !== id))
    );
  };

  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditingText(todo.title);
  };

  const saveTodo = (id) => {
    fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingText }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
        setEditingTodo(null);
        setEditingText("");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          📝 To-Do App
        </h1>

        {/* Add New Task */}
        <div className="flex mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new task"
            className="flex-1 p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-600 text-white px-6 py-3 rounded-r-xl hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>

        {/* List Todos */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-xl shadow-sm"
            >
              {editingTodo === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 p-2 border rounded-lg mr-2"
                  />
                  <button
                    onClick={() => saveTodo(todo.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-green-600"
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={() => setEditingTodo(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
                  >
                    ❌ Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-gray-800 font-medium">
                    {todo.title}
                  </span>
                  <button
                    onClick={() => startEditing(todo)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-500"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    ❌ Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
