// pages/index.js

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.assistantMessage);
    } catch (error) {
      setResponse("Virhe viestiä lähetettäessä.");
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>OpenAI Chat</h1>
      <textarea
        placeholder="Kirjoita viestisi..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <br />
      <button onClick={sendMessage} style={{ padding: "8px 16px" }}>
        Lähetä
      </button>
      <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{response}</div>
    </div>
  );
}
