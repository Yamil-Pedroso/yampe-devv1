import { useState } from "react";

interface Props {
  initialMessage?: string;
  onSubmit: (message: string) => void;
  title: string;
  buttonText: string;
}

export default function NotificationForm({
  initialMessage = "",
  onSubmit,
  title,
  buttonText,
}: Props) {
  const [message, setMessage] = useState(initialMessage);

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white/10 p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your notification"
          className="px-4 py-3 rounded-lg bg-white/20 border border-white/30"
        />

        <button
          onClick={() => onSubmit(message)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
