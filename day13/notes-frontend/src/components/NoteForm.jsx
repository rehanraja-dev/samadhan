/* eslint-disable react/prop-types */
export default function NoteForm({ title, content, setTitle, setContent, onSubmit, isEditing }) {
  return (
    <form onSubmit={onSubmit} className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">{isEditing ? "Edit Note" : "Add Note"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="mb-3 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
