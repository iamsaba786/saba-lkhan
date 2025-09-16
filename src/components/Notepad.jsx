import React, { useState, useEffect, useRef } from "react";

export default function Notepad({ onClose }) {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem("todos_v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // ✅ new state for minimize
  const [selectedTask, setSelectedTask] = useState(null);

  const inputRef = useRef(null);

  // save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos_v1", JSON.stringify(todos));
  }, [todos]);

  const genId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  function addTodo(e) {
    e?.preventDefault?.();
    const text = input.trim();
    if (!text) return;
    const newTodo = { id: genId(), text, completed: false, description: "" };
    setTodos((s) => [newTodo, ...s]);
    setInput("");
    inputRef.current?.focus();
  }

  function toggleTodo(id) {
    setTodos((s) =>
      s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((s) => s.filter((t) => t.id !== id));
  }

  function startEdit(id, text) {
    setEditingId(id);
    setEditingText(text);
  }

  function saveEdit(id) {
    const text = editingText.trim();
    if (!text) {
      deleteTodo(id);
    } else {
      setTodos((s) => s.map((t) => (t.id === id ? { ...t, text } : t)));
    }
    setEditingId(null);
    setEditingText("");
  }

  function clearCompleted() {
    setTodos((s) => s.filter((t) => !t.completed));
  }

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const remainingCount = todos.filter((t) => !t.completed).length;

  // ✅ show restore button when minimized
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-zinc-800 text-white rounded shadow z-50"
      >
        📝 Restore Notepad
      </button>
    );
  }

  return (
    <div
      className={`${
        isMaximized
          ? "absolute top-16 left-45 w-[900px] h-[478px]"
          : "fixed top-0 left-0 right-0 bottom-12"
      } z-40 bg-zinc-100/95 text-black shadow-2xl border rounded-xl border-zinc-700 flex flex-col overflow-hidden transition-all duration-300`}
    >
      {/* Header */}
      <div className="text-zinc-100 bg-zinc-900/95 p-2 font-semibold flex justify-between items-center">
        <span>Notepad</span>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-md px-3 cursor-pointer hover:bg-zinc-700 rounded"
          >
            ➖
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-md px-3 cursor-pointer hover:bg-zinc-700 rounded"
          >
            {isMaximized ? "🗗" : "🗖"}
          </button>
          <button
            onClick={onClose}
            className="text-sm cursor-pointer text-red-600 hover:text-red-800"
          >
            ❌
          </button>
        </div>
      </div>

      {/* Add form */}
      <form onSubmit={addTodo} className="flex gap-2 mb-4 p-4">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task and press Enter"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-50 border border-zinc-800 text-white rounded-lg hover:bg-black hover:text-white hover:scale-105 transition duration-200 cursor-pointer"
          disabled={!input.trim()}
        >
          Add
        </button>
      </form>

      {/* Todo list */}
      <div className="space-y-2 px-4 flex-1 overflow-auto">
        {visibleTodos.length === 0 && (
          <div className="text-center text-gray-400 py-6">
            No tasks — Empty try adding one ✨
          </div>
        )}

        {visibleTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 border p-3 rounded-lg"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5"
            />

            {editingId === todo.id ? (
              <input
                className="flex-1 px-2 py-1 border rounded-md"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => saveEdit(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(todo.id);
                  if (e.key === "Escape") {
                    setEditingId(null);
                    setEditingText("");
                  }
                }}
                autoFocus
              />
            ) : (
              <div className="flex-1 flex items-center justify-between">
                <div
                  className={`truncate ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEdit(todo.id, todo.text)}
                    className="text-sm px-2 py-1 border rounded-md hover:bg-gray-100 hover:text-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedTask(todo)}
                    className="text-sm px-2 py-1 border rounded-md hover:bg-blue-600 text-white"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-sm px-2 py-1 border rounded-md hover:bg-red-600 text-white "
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 px-4 pb-4">
        <div className="text-sm text-gray-600">{remainingCount} items left</div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full border hover:bg-black hover:text-white hover:scale-105 transition duration-200 cursor-pointer  ${
              filter === "all" ? "bg-indigo-50" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded-full border hover:bg-black hover:text-white hover:scale-105 transition duration-200 cursor-pointer  ${
              filter === "active" ? "bg-indigo-50" : ""
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded-full border hover:bg-black hover:text-white hover:scale-105 transition duration-200 cursor-pointer  ${
              filter === "completed" ? "bg-indigo-50" : ""
            }`}
          >
            Completed
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              setTodos((s) => s.map((t) => ({ ...t, completed: true })))
            }
            className="hover:bg-white hover:text-black hover:scale-105 transition duration-200 cursor-pointer px-3 py-1 border rounded-md text-sm"
          >
            Mark all done
          </button>
          <button
            onClick={clearCompleted}
            className="hover:bg-red-600 hover:text-white hover:scale-105 transition duration-200 cursor-pointer px-3 py-1 border rounded-md text-sm text-red-600"
          >
            Clear completed
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-400 mt-3 px-4 pb-2">
        Tip: double-click Edit or press Enter/Escape while editing.
      </div>

      {/* ✅ Description Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-2">{selectedTask.text}</h2>
            <textarea
              value={selectedTask.description || ""}
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  description: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              rows="5"
              placeholder="Write details here..."
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setTodos((prev) =>
                    prev.map((t) =>
                      t.id === selectedTask.id ? selectedTask : t
                    )
                  );
                  setSelectedTask(null);
                }}
                className="bg-blue-500 hover:scale-105 transition duration-200 cursor-pointer text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setSelectedTask(null)}
                className="bg-red-600 hover:bg-red-700 hover:scale-105 transition duration-200 cursor-pointer text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
