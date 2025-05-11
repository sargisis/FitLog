import React, { useState } from "react";
import { geminiChat } from "../../Api/ApiService";

const GeminiChat = () => {
  const username = localStorage.getItem("username") || "guest";
  const storageKey = `geminiChat_${username}`;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const quickQuestions = [
    "How much protein do I need to build muscle?",
    "Best exercises for fat loss?",
    "What should I eat before a workout?",
    "How many calories do I need daily?",
    "How to boost metabolism naturally?",
  ];

  const saveMessages = (updated) => {
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updated = [...messages, userMessage];
    setMessages(updated);
    saveMessages(updated);

    try {
      const res = await geminiChat({ message: input });
      const botReply = {
        sender: "bot",
        text: res.data.reply || "No response received.",
      };
      const final = [...updated, botReply];
      setMessages(final);
      saveMessages(final);
    } catch (err) {
      const errorReply = {
        sender: "bot",
        text: "❌ Error: " + err.message,
      };
      const final = [...updated, errorReply];
      setMessages(final);
      saveMessages(final);
    }

    setInput("");
  };

  const sendMessageFromQuick = async (text) => {
    const userMessage = { sender: "user", text };
    const updated = [...messages, userMessage];
    setMessages(updated);
    saveMessages(updated);

    try {
      const res = await geminiChat({ message: text });
      const botReply = {
        sender: "bot",
        text: res.data.reply || "No response received.",
      };
      const final = [...updated, botReply];
      setMessages(final);
      saveMessages(final);
    } catch (err) {
      const errorReply = {
        sender: "bot",
        text: "❌ Error: " + err.message,
      };
      const final = [...updated, errorReply];
      setMessages(final);
      saveMessages(final);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => {
    localStorage.removeItem(storageKey);
    setMessages([]);
  };

  return (
    <div style={styles.page}>
      <div style={styles.chatBox}>
        <h2 style={styles.title}>💬 Gemini Fitness & Nutrition Chat</h2>

        <div style={styles.quickButtons}>
          {quickQuestions.map((text, index) => (
            <button
              key={index}
              onClick={() => sendMessageFromQuick(text)}
              style={styles.quickButton}
            >
              {text}
            </button>
          ))}
        </div>

        <div style={styles.messages}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                ...styles.bubble,
                ...(msg.sender === "user"
                  ? styles.userBubble
                  : styles.botBubble),
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <button onClick={clearChat} style={styles.clearButton}>
          🗑️ Clear Chat
        </button>

        <div style={styles.inputArea}>
          <input
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
          />
          <button onClick={sendMessage} style={styles.sendBtn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    background: "#fff",
    width: "100%",
    maxWidth: "600px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    color: "#d61a3c",
    marginBottom: "20px",
  },
  quickButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "15px",
  },
  quickButton: {
    padding: "6px 12px",
    fontSize: "14px",
    backgroundColor: "#eee",
    border: "1px solid #ccc",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  messages: {
    flex: 1,
    maxHeight: "60vh",
    overflowY: "auto",
    marginBottom: "10px",
  },
  bubble: {
    padding: "10px 15px",
    borderRadius: "16px",
    marginBottom: "10px",
    maxWidth: "80%",
    wordWrap: "break-word",
  },
  userBubble: {
    backgroundColor: "#d61a3c",
    color: "#fff",
    alignSelf: "flex-end",
    borderBottomRightRadius: "4px",
  },
  botBubble: {
    backgroundColor: "#eee",
    color: "#333",
    alignSelf: "flex-start",
    borderBottomLeftRadius: "4px",
  },
  clearButton: {
    alignSelf: "center",
    marginBottom: "10px",
    background: "none",
    border: "none",
    color: "#888",
    fontSize: "14px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
    marginTop: "auto",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  sendBtn: {
    padding: "10px 16px",
    backgroundColor: "#d61a3c",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default GeminiChat;
