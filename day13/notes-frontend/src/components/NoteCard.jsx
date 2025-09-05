/* eslint-disable react/prop-types */
export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <li className="group relative rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md">
      <h3 className="text-lg font-semibold">{note.title}</h3>
      <p className="mt-1 whitespace-pre-wrap text-sm text-zinc-600">{note.content}</p>

      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
        <span>{new Date(note.created_at).toLocaleString()}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="rounded-lg border px-3 py-1 text-indigo-600 hover:bg-indigo-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="rounded-lg border px-3 py-1 text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
