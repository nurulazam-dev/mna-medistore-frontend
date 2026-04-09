"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { env } from "@/env";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function AIHealthAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Welcome! I am MNA MediStore AI. I can assist you with any health or medicine-related information. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "bot", text: data.data }]);
      } else {
        throw new Error();
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I am unable to connect at the moment. Please try again in a few minutes.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-9999 font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 ${
          isOpen
            ? "bg-rose-500 rotate-90"
            : "bg-emerald-600 hover:bg-emerald-500"
        } text-white`}
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={32} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-15 right-0 w-80 md:w-92 h-118 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="p-6 bg-linear-to-r from-green-600 to-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-sm tracking-tight leading-none mb-1">
                  MNA MediStore AI
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">
                    Online Assistant
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setMessages([messages[0]])}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              title="Reset Chat"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/20"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
              >
                {msg.role === "bot" && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                    <Bot
                      size={16}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-emerald-600 text-white rounded-br-none font-medium"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-800"
                  }`}
                >
                  {msg.text.split("\n").map((line, index) => (
                    <p
                      key={index}
                      className={
                        line.includes("⚠️")
                          ? "mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-[11px] font-bold italic opacity-80"
                          : ""
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Bot size={16} className="text-slate-400" />
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-2 rounded-[1.5rem] border border-transparent focus-within:border-emerald-500/50 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about medicines..."
                className="flex-1 bg-transparent border-none focus:ring-0 outline-0 text-sm px-3 py-2 text-slate-800 dark:text-white placeholder:text-slate-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-600 transition-all active:scale-90"
              >
                <Send size={18} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              <ShieldCheck size={12} />
              End-to-End Secure Healthcare AI
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
