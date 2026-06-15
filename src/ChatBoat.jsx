import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";




// ✅ Initialize once outside the component
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

function ChatBoat() {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonShown, setButtonShown] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "👋 Hi there! I'm your Agentic Assistant. Ask me anything about  frontend development",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ✅ Persistent Gemini chat session (maintains conversation history automatically)
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    chatRef.current = ai.chats.create({
      model: "gemini-2.5-flash",
      history: [],
      config: {
  systemInstruction: `
You are an expert Frontend Developer Assistant.

You help users with:
- JavaScript
- TypeScript
- React.js
- HTML5
- CSS3
- React Hooks
- State Management
- REST APIs
- Frontend Architecture
- Responsive Design
- Web Performance

Rules:
1. Answer frontend-related questions clearly and accurately.
2. Provide code examples when helpful.
3. Explain concepts step-by-step for beginners.
4. Follow modern frontend best practices.
5. If the question is NOT related to frontend development, politely reply:

"⚠️ I specialize in frontend development topics such as JavaScript, TypeScript, React.js, HTML, CSS, React Hooks, State Management, and REST APIs. Please ask a frontend-related question."

6. Never refuse valid JavaScript, TypeScript, React, HTML, CSS, API, or frontend questions.
`
}
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleClose = () => { setIsOpen(false); setButtonShown(true); };
  const handleOpen  = () => { setIsOpen(true);  setButtonShown(false); };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", text: trimmed, time: getTime() },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      // ✅ Gemini keeps history internally in chatRef.current
      const response = await chatRef.current.sendMessage({ message: trimmed });

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: response.text, time: getTime() },
      ]);
    } catch (err) {
      console.error("Gemini error:", err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: "⚠️ Please Ask frontend related question like React js, JavaScript, TypeScript, Html, Css ect..", time: getTime() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleOpen}
        className={`${buttonShown
          ? "flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 py-3 z-50 fixed bottom-4 right-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
          : "hidden"}`}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M12 2a3 3 0 0 0-3 3v1H7a3 3 0 0 0-3 3v2H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2h1a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-1V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3Zm-1 5V5a1 1 0 1 1 2 0v2h-2Zm-5 4V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2H6Zm13 4v-1h1v1h-1ZM4 14v-1h1v1H4Zm4 4h8a1 1 0 0 0 1-1v-3H7v3a1 1 0 0 0 1 1Z"/>
        </svg>
        <span className="text-white font-medium text-sm hidden sm:inline">Chat with Agent</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-full z-50 absolute mx-auto p-0 left-0 right-0 top-4 max-w-[1168px] h-[520px] sm:h-[640px] rounded-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col">

          {/* Header */}
          <div className="h-16 px-4 sm:px-5 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#1c1240] via-[#2a1554] to-[#4c0f6f]">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-700 flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                    <path d="M12 2a3 3 0 0 0-3 3v1H7a3 3 0 0 0-3 3v2H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2h1a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-1V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3Zm-1 5V5a1 1 0 1 1 2 0v2h-2Zm-5 4V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2H6Zm13 4v-1h1v1h-1ZM4 14v-1h1v1H4Zm4 4h8a1 1 0 0 0 1-1v-3H7v3a1 1 0 0 0 1 1Z"/>
                  </svg>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1f1142]" />
              </div>
              <div>
                <h1 className="text-sm sm:text-lg text-white font-semibold leading-tight">AI Frontend Assistant ✨</h1>
<p className="text-sm sm:text-sm text-white/80">
  Powered by Gemini · <span className="text-amber-400">Amit Biswas Portfolio</span>
</p>              </div>
            </div>
            <button onClick={handleClose} className="w-8 h-8 rounded-full hover:bg-white/10 transition flex items-center justify-center text-white/70">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 space-y-6 bg-[#0b1122]">
            {messages.map((msg) =>
              msg.role === "assistant" ? (
                <div key={msg.id} className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#24304c] border border-white/10 flex items-center justify-center text-lg">🤖</div>
                  <div className="max-w-[85%] sm:max-w-[70%]">
                    <div className="inline-flex rounded-2xl rounded-tl-md bg-[#1f2941] border border-white/10 px-4 py-3 text-sm leading-6 text-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.22)] whitespace-pre-wrap">{msg.text}</div>
                    <p className="mt-2 text-[11px] text-white/35 pl-1">{msg.time}</p>
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex items-start justify-end gap-2 sm:gap-3">
                  <div className="max-w-[80%] sm:max-w-[55%] flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex rounded-2xl rounded-br-md bg-gradient-to-b from-[#5f56f2] to-[#7a39f0] px-4 py-3 text-sm leading-6 font-medium text-white shadow-[0_12px_30px_rgba(94,86,242,0.35)]">{msg.text}</div>
                      <div className="w-8 h-8 rounded-lg bg-[#a23af5] flex items-center justify-center text-white shadow-md">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="8" r="4" /></svg>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] text-white/35 pr-1">{msg.time}</p>
                  </div>
                </div>
              )
            )}

            {/* Typing dots */}
            {isTyping && (
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="mt-1 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#24304c] border border-white/10 flex items-center justify-center text-lg">🤖</div>
                <div className="bg-[#1f2941] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-md flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 sm:p-3 border-t border-white/10 bg-[#0a1022]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask the Agent about React, JavaScript, TypeScript and more..."
                className="flex-1 h-12 sm:h-14 rounded-xl sm:rounded-2xl border border-white/10 bg-[#10182d] px-4 text-white text-sm placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#5b4df2] hover:bg-[#6a5af7] disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center shadow-[0_12px_30px_rgba(91,77,242,0.35)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none stroke-[2.2] rotate-45">
                  <path d="M3 11.5L21 3l-8.5 18-1.5-7L3 11.5Z" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default ChatBoat;
