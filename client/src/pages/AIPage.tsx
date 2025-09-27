import { useState, useRef, FormEvent } from "react";

export default function AIPage() {
  const [messages, setMessages] = useState([
    { text: "Hey! I’m here to help. How are you feeling today?", who: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const addMessage = (text: string, who: "user" | "bot") => {
    setMessages((prev) => [...prev, { text, who }]);
    setTimeout(scrollToBottom, 0);
  };

  const simpleReply = (userText: string) => {
    const t = userText.toLowerCase();
    if (t.includes("water")) return "Nice! Try aiming for 8 glasses today 💧";
    if (t.includes("stress") || t.includes("anx")) return "Let’s take 5 deep breaths together. In… out…";
    if (t.includes("walk")) return "A 10–30 minute walk outside can reset your mood 🌿";
    return "Got it. Tell me a goal for today and I’ll help you track it.";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    addMessage(text, "user");
    setInput("");

    // fake AI reply with typing effect
    addMessage("typing...", "bot");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev.filter((m) => m.text !== "typing..."),
        { text: simpleReply(text), who: "bot" },
      ]);
      scrollToBottom();
    }, 700);
  };

  return (
    <main className="phone">
      {/* Header */}
      <header className="topbar">
        <div className="avatar">M</div>
        <div className="grow">
          <div className="title">Monika AI</div>
          <div className="sub">Your wellness companion</div>
        </div>
      </header>

      {/* Chat area */}
      <section ref={chatRef} className="chat" aria-live="polite">
        {messages.map((msg, i) => (
          <div key={i} className={`row ${msg.who}`}>
            <div className="bubble">
              {msg.text === "typing..." ? (
                <span className="dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              ) : (
                msg.text
              )}
              {msg.who === "bot" && <div className="stamp">Now</div>}
            </div>
          </div>
        ))}
      </section>

      {/* Composer */}
      <form className="composer" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Message AI…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button className="btn" type="submit" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </main>
  );
}
