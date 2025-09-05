import { useEffect, useMemo, useState } from "react";
import NoteForm from "./components/NoteForm.jsx";
import NoteCard from "./components/NoteCard.jsx";

const API = "http://127.0.0.1:8000/api/notes/";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // editing state
  const [editingId, setEditingId] = useState(null);

  // search filter
  const [q, setQ] = useState("");

  // Fetch all notes
  const loadNotes = async () => {
    setLoading(true);
    const res = await fetch(API);
    const data = await res.json();
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // Add / Update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // UPDATE
      const res = await fetch(`${API}${editingId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        await loadNotes();
        resetForm();
      }
    } else {
      // CREATE
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        const newNote = await res.json();
        setNotes((prev) => [newNote, ...prev]);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeNote = async (id) => {
    if (!confirm("Delete this note?")) return;
    const res = await fetch(`${API}${id}/`, { method: "DELETE" });
    if (res.ok) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (editingId === id) resetForm();
    }
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(term) ||
        (n.content || "").toLowerCase().includes(term)
    );
  }, [notes, q]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-center text-3xl font-bold tracking-tight">
          📝 Day 13 — Notes App (Django + React)
        </h1>
        <p className="mt-1 text-center text-sm text-zinc-600">
          CRUD • Search • Clean UI with Tailwind
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-16">
        {/* Search + Reset */}
        <div className="mb-4 flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {editingId && (
            <button
              onClick={resetForm}
              className="rounded-xl border px-3 py-2 text-zinc-700 hover:bg-zinc-100"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* Form */}
        <NoteForm
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          onSubmit={handleSubmit}
          isEditing={!!editingId}
        />

        {/* List */}
        {loading ? (
          <div className="rounded-2xl border bg-white p-6 text-center text-zinc-600 shadow-sm">
            Loading notes…
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-center text-zinc-600 shadow-sm">
            No notes found.
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={startEdit}
                onDelete={removeNote}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
