"use client";
import React, { useState } from 'react';

type Message = { sender: string, text: string };

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "Kamu", text: input }]);
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages(msgs => [...msgs, { sender: "AI", text: data.reply }]);
    setInput('');
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <div style={{ border: '1px solid #eee', padding: 10, height: 300, overflowY: 'auto', marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}><b>{msg.sender}:</b> {msg.text}</div>
        ))}
        {loading && <div><i>AI sedang mengetik...</i></div>}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
        style={{ width: '75%', marginRight: 5 }}
        placeholder="Ketik pesan..."
      />
      <button onClick={sendMessage} disabled={loading}>Kirim</button>
    </div>
  );
}
