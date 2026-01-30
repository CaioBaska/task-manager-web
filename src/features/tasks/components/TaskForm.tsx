import { useRef, useState } from "react";

interface TaskFormProps {
  onCreate: (formData: FormData) => Promise<void>;
}

export function TaskForm({ onCreate }: TaskFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [slaHours, setSlaHours] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      alert("Selecione um arquivo");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slaHours", String(slaHours));
    formData.append("file", file);

    await onCreate(formData);

    setTitle("");
    setSlaHours(1);
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        min={1}
        value={slaHours}
        onChange={(e) => setSlaHours(Number(e.target.value))}
        required
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        required
      />

      <button type="submit">Criar</button>
    </form>
  );
}
