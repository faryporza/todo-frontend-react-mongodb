import { useEffect, useState } from "react";
import { getTodos, addTodo, toggleTodo, deleteTodo, updateTodo } from "./services/api";
import "./index.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState(""); // เพิ่ม state สำหรับ note
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getTodos({ q });
      setTodos(data.items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);          // load ครั้งแรก
  useEffect(() => { const t = setTimeout(load, 400); return () => clearTimeout(t); }, [q]); // ค้นหา

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTodo({ title, note }); // ส่ง note ไปด้วย
    setTitle("");
    setNote(""); // reset note หลังเพิ่ม
    await load();
  };

  const handleToggle = async (id) => {
    await toggleTodo(id);
    await load();
  };

  const handleDelete = async (id) => {
    if (!confirm("ลบงานนี้ใช่ไหม?")) return;
    await deleteTodo(id);
    await load();
  };

  const handleRename = async (id, prev) => {
    const t = prompt("แก้ไขชื่อรายการ:", prev);
    if (t === null) return;
    await updateTodo(id, { title: t });
    await load();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Todo App (React + MongoDB)</h1>
          <p className="text-sm text-gray-500">
            API: {import.meta.env.VITE_API_URL}
          </p>
        </header>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 rounded-xl border px-3 py-2"
            placeholder="พิมพ์งานใหม่..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <input
            className="flex-1 rounded-xl border px-3 py-2"
            placeholder="หมายเหตุ (ถ้ามี)..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            className="rounded-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleAdd}
          >
            เพิ่ม
          </button>
        </div>

        <div className="mb-4">
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="ค้นหา (พิมพ์แล้วรอสักครู่)..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-500">กำลังโหลด...</div>
        ) : todos.length === 0 ? (
          <div className="text-center text-gray-400">ยังไม่มีรายการ</div>
        ) : (
          <ul className="space-y-2">
            {todos.map((t) => (
              <li
                key={t._id}
                className="rounded-xl border bg-white px-4 py-3 flex items-center gap-3 shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleToggle(t._id)}
                  className="size-5"
                />
                <div
                  className={`flex-1 ${t.completed ? "line-through text-gray-400" : ""}`}
                  onDoubleClick={() => handleRename(t._id, t.title)}
                >
                  <div className="font-medium">{t.title}</div>
                  {t.note ? <div className="text-xs text-gray-500">{t.note}</div> : null}
                </div>
                <button
                  className="rounded-lg px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200"
                  onClick={() => handleDelete(t._id)}
                >
                  ลบ
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
