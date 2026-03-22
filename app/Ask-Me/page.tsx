"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Send, Bot, WifiOff, RotateCcw, LogOut } from "lucide-react";
import { SiGoogle, SiGithub } from "react-icons/si";

const API_BASE = process.env.NEXT_PUBLIC_HERALD_API_URL ?? "http://localhost:8000";

const SUGGESTED = [
  "What's your professional background?",
  "Which companies has Varun worked at?",
  "What are Varun's key technical skills?",
  "Tell me about Varun's AI/ML experience.",
  "Is Varun open to new opportunities?",
];

type Role = "user" | "herald";
interface Message { id: string; role: Role; text: string; }

let _id = 0;
function genId() { return `${Date.now()}-${_id++}`; }

/* ── Typing dots ── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }} />
      ))}
    </div>
  );
}

/* ── Derive initials from a display name ── */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ── Message bubble ── */
function MessageBubble({ msg, userInitials }: { msg: Message; userInitials: string }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
        isUser ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900" : "bg-violet-500/15 text-violet-500"
      }`}>
        {isUser ? userInitials : "H"}
      </div>
      <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-tr-sm"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm"
      }`}>
        {msg.text}
      </div>
    </div>
  );
}

/* ── Login gate ── */
function LoginGate() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const providers = [
    { id: "google", label: "Google", Icon: SiGoogle, color: "hover:border-red-400/50  hover:bg-red-500/5"  },
    { id: "github", label: "GitHub", Icon: SiGithub, color: "hover:border-zinc-400/50 hover:bg-zinc-500/5" },
  ];

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 py-16" style={{ animation: "fade-up 0.6s ease both 0.1s" }}>
      {/* Herald avatar */}
      <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
        <Bot className="w-7 h-7 text-violet-500" />
      </div>

      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        Sign in to chat with Herald
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-xs mb-8">
        Herald is my AI representative. Sign in to start a conversation — your chat history is saved across visits.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {providers.map(({ id, label, Icon, color }) => (
          <button
            key={id}
            onClick={() => { setLoadingProvider(id); signIn(id); }}
            disabled={loadingProvider !== null}
            className={[
              "flex items-center gap-3 w-full px-5 py-3 rounded-xl border",
              "border-zinc-200 dark:border-zinc-700",
              "bg-white/50 dark:bg-zinc-900/50",
              "text-sm font-medium text-zinc-700 dark:text-zinc-300",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              color,
            ].join(" ")}
          >
            {loadingProvider === id ? (
              <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <Icon className="w-4 h-4 flex-shrink-0" />
            )}
            <span>Continue with {label}</span>
          </button>
        ))}
      </div>

      <p className="text-[11px] text-zinc-400 dark:text-zinc-600 mt-8 text-center max-w-xs">
        Only your name and email are used to identify your session. No data is sold or shared.
      </p>
    </div>
  );
}

/* ── Herald session ID — tied to the logged-in user, persists in localStorage ── */
function useHeraldSessionId(userId: string | null | undefined) {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) { setSessionId(null); return; }
    const key = `herald_session_${userId}`;
    let sid = localStorage.getItem(key);
    if (!sid) {
      sid = Math.random().toString(36).slice(2, 18);
      localStorage.setItem(key, sid);
    }
    setSessionId(sid);
  }, [userId]);

  const newSession = useCallback(() => {
    if (!userId) return;
    const key = `herald_session_${userId}`;
    const sid = Math.random().toString(36).slice(2, 18);
    localStorage.setItem(key, sid);
    setSessionId(sid);
  }, [userId]);

  return { sessionId, newSession };
}

/* ── Chat UI ── */
function ChatUI({ userId, userName }: { userId: string; userName: string }) {
  const userInitials = getInitials(userName);
  const { sessionId, newSession } = useHeraldSessionId(userId);
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const bottomRef   = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  // Reset visible messages when session changes (new chat)
  useEffect(() => { setMessages([]); setError(null); }, [sessionId]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading || !sessionId) return;

    setMessages((prev) => [...prev, { id: genId(), role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);
    setError(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch(`${API_BASE}/ai/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, session_id: sessionId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply: string = data.response ?? data.message ?? data.answer ?? "…";
      setMessages((prev) => [...prev, { id: genId(), role: "herald", text: reply }]);
    } catch (err) {
      setError(err instanceof TypeError
        ? "Herald is offline. Make sure the backend is running."
        : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }, [loading, sessionId]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col px-8 pb-8 max-w-3xl" style={{ height: "calc(100dvh - 5rem)" }}>

      {/* Header */}
      <div className="shrink-0 flex items-start justify-between" style={{ animation: "fade-up 0.6s ease both 0.05s" }}>
        <div>
          <h1 className="text-3xl font-bold mb-1 py-4 flex items-center gap-2">
            <Bot className="w-7 h-7 text-zinc-500 dark:text-zinc-400" />
            Ask Me!
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
            Powered by{" "}
            <a href="https://github.com/vijaykv1/herald" target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Herald
            </a>{" "}
            — my AI representative. Ask anything about my background, skills, or experience.
          </p>
        </div>

        {/* User + sign out */}
        <div className="flex items-center gap-2 pt-4 shrink-0">
          <span className="text-xs text-zinc-400 dark:text-zinc-500 hidden sm:block">{userName}</span>
          <button
            onClick={() => signOut()}
            title="Sign out"
            className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors px-2 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="shrink-0 flex items-center gap-2 mb-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="text-xs underline opacity-70 hover:opacity-100 transition-opacity">Dismiss</button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pb-3 -mx-2 px-2">
        {isEmpty && (
          <div className="flex flex-col gap-4 pt-2" style={{ animation: "fade-up 0.6s ease both 0.2s" }}>
            <div className="flex gap-2.5">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/15 flex items-center justify-center text-[11px] font-bold text-violet-500">H</div>
              <div className="max-w-[75%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 leading-relaxed">
                Hi {userName?.split(" ")[0]}! I&apos;m Herald, Varun&apos;s AI representative. Ask me anything about his professional background, skills, or experience.
              </div>
            </div>
            <div className="ml-9 flex flex-col gap-2">
              <p className="text-xs text-zinc-400 dark:text-zinc-500">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED.map((q) => (
                  <button key={q} onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {messages.map((msg) => <MessageBubble key={msg.id} msg={msg} userInitials={userInitials} />)}
        {loading && (
          <div className="flex gap-2.5">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/15 flex items-center justify-center text-[11px] font-bold text-violet-500">H</div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-zinc-100 dark:bg-zinc-800"><TypingDots /></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="shrink-0 pt-3 border-t border-zinc-200 dark:border-zinc-800" style={{ animation: "fade-up 0.6s ease both 0.3s" }}>
        <div className="flex items-end gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 focus-within:border-zinc-400 dark:focus-within:border-zinc-500 transition-colors">
          <textarea ref={textareaRef} value={input} onChange={handleInput} onKeyDown={handleKeyDown}
            placeholder="Ask me anything…" rows={1} disabled={loading || !sessionId}
            className="flex-1 resize-none bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none leading-relaxed disabled:opacity-50"
            style={{ maxHeight: "128px", overflowY: "auto" }} />
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading || !sessionId} aria-label="Send message"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 disabled:opacity-30 hover:opacity-75 transition-opacity">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-600">Herald may not always be accurate.</p>
          <button onClick={() => { newSession(); }}
            className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
            <RotateCcw className="w-3 h-3" />
            New chat
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function AskMePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center" style={{ height: "calc(100dvh - 5rem)" }}>
        <span className="w-6 h-6 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="w-full flex items-center justify-center" style={{ minHeight: "calc(100dvh - 5rem)" }}>
        <LoginGate />
      </div>
    );
  }

  return (
    <ChatUI
      userId={session.user.email ?? session.user.name ?? "user"}
      userName={session.user.name ?? session.user.email ?? "there"}
    />
  );
}
