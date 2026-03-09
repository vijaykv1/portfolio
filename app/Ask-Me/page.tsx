"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, WifiOff, RotateCcw } from "lucide-react";

/*
 * Herald API contract (FastAPI backend):
 *
 *   POST /chat
 *   Body:     { "message": string, "session_id": string }
 *   Response: { "response": string }
 *
 *   Set NEXT_PUBLIC_HERALD_API_URL in .env.local to point at your backend.
 *   Defaults to http://localhost:8000 for local development.
 */
const API_BASE = process.env.NEXT_PUBLIC_HERALD_API_URL ?? "http://localhost:8000";

const SUGGESTED = [
  "What's your professional background?",
  "Which companies has Varun worked at?",
  "What are Varun's key technical skills?",
  "Tell me about Varun's AI/ML experience.",
  "Is Varun open to new opportunities?",
];

type Role = "user" | "herald";

interface Message {
  id: string;
  role: Role;
  text: string;
}

let _id = 0;
function genId() {
  return `${Date.now()}-${_id++}`;
}

/* ── Typing dots ──────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
        />
      ))}
    </div>
  );
}

/* ── Message bubble ───────────────────────────────────────── */
function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
          isUser
            ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
            : "bg-violet-500/15 text-violet-500"
        }`}
      >
        {isUser ? "VV" : "H"}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-tr-sm"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function AskMePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Session ID persists for the lifetime of this page view
  const [sessionId] = useState(() => Math.random().toString(36).slice(2, 18));

  const bottomRef  = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setMessages((prev) => [...prev, { id: genId(), role: "user", text: trimmed }]);
      setInput("");
      setLoading(true);
      setError(null);

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      try {
        const res = await fetch(`${API_BASE}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, session_id: sessionId }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const reply: string = data.response ?? data.message ?? data.answer ?? "…";

        setMessages((prev) => [...prev, { id: genId(), role: "herald", text: reply }]);
      } catch (err) {
        setError(
          err instanceof TypeError
            ? "Herald is offline. Make sure the backend is running."
            : "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
        textareaRef.current?.focus();
      }
    },
    [loading, sessionId]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }

  function resetChat() {
    setMessages([]);
    setError(null);
    textareaRef.current?.focus();
  }

  const isEmpty = messages.length === 0;

  return (
    /* Fill viewport below the sticky nav (~60px) so the input stays on screen */
    <div
      className="flex flex-col px-8 pb-8 max-w-3xl"
      style={{ height: "calc(100dvh - 5rem)" }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="shrink-0" style={{ animation: "fade-up 0.6s ease both 0.05s" }}>
        <h1 className="text-3xl font-bold mb-1 py-4 flex items-center gap-2">
          <Bot className="w-7 h-7 text-zinc-500 dark:text-zinc-400" />
          Ask Me!
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
          Powered by{" "}
          <a
            href="https://github.com/vijaykv1/herald"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Herald
          </a>{" "}
          — my AI representative. Ask anything about my background, skills, or experience.
        </p>
      </div>

      {/* ── Offline / error banner ──────────────────────────── */}
      {error && (
        <div className="shrink-0 flex items-center gap-2 mb-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-xs underline opacity-70 hover:opacity-100 transition-opacity"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── Messages ────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pb-3 -mx-2 px-2">
        {/* Empty state */}
        {isEmpty && (
          <div
            className="flex flex-col gap-4 pt-2"
            style={{ animation: "fade-up 0.6s ease both 0.2s" }}
          >
            {/* Herald greeting */}
            <div className="flex gap-2.5">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/15 flex items-center justify-center text-[11px] font-bold text-violet-500">
                H
              </div>
              <div className="max-w-[75%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 leading-relaxed">
                Hi! I&apos;m Herald, Varun&apos;s AI representative. Ask me anything about
                his professional background, skills, or experience.
              </div>
            </div>

            {/* Suggested questions */}
            <div className="ml-9 flex flex-col gap-2">
              <p className="text-xs text-zinc-400 dark:text-zinc-500">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-2.5">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/15 flex items-center justify-center text-[11px] font-bold text-violet-500">
              H
            </div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-zinc-100 dark:bg-zinc-800">
              <TypingDots />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ───────────────────────────────────────── */}
      <div
        className="shrink-0 pt-3 border-t border-zinc-200 dark:border-zinc-800"
        style={{ animation: "fade-up 0.6s ease both 0.3s" }}
      >
        <div className="flex items-end gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 focus-within:border-zinc-400 dark:focus-within:border-zinc-500 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            rows={1}
            disabled={loading}
            className="flex-1 resize-none bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none leading-relaxed disabled:opacity-50"
            style={{ maxHeight: "128px", overflowY: "auto" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 disabled:opacity-30 hover:opacity-75 transition-opacity"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
            Herald may not always be accurate. Don&apos;t rely on it for critical decisions.
          </p>
          {messages.length > 0 && !loading && (
            <button
              onClick={resetChat}
              className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              New chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
