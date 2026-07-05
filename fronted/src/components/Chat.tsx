"use client";

import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "您好，我是股票分析助手。有什么可以帮您的？",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `正在分析您的问题：${input}\n\n[这里将显示 AI 的分析结果]`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="h-18 px-8 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">对话</h1>
          <p className="text-base text-[var(--text-secondary)]">与股票 Agent 进行交互</p>
        </div>
        <button className="px-5 py-2.5 bg-[var(--bg-elevated)] hover:bg-[var(--border)] rounded-xl text-base transition-colors border border-[var(--border)]">
          新建对话
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[var(--bg-primary)]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-base font-medium ${
                message.role === "user"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]"
              }`}
            >
              {message.role === "user" ? "U" : "AI"}
            </div>

            {/* Content */}
            <div
              className={`flex-1 max-w-3xl ${
                message.role === "user" ? "text-right" : ""
              }`}
            >
              <div
                className={`inline-block px-6 py-4 rounded-2xl text-left text-base leading-relaxed ${
                  message.role === "user"
                    ? "bg-[var(--accent)] text-white shadow-md"
                    : "bg-[var(--bg-surface)] border border-[var(--border)]"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                {message.timestamp.toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-base font-medium text-[var(--text-secondary)] border border-[var(--border)]">
              AI
            </div>
            <div className="flex-1 max-w-3xl">
              <div className="inline-block px-6 py-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-[var(--accent)] rounded-full animate-bounce" />
                  <div className="w-2.5 h-2.5 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:0.1s]" />
                  <div className="w-2.5 h-2.5 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-8 border-t border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="输入您的问题..."
              className="flex-1 min-h-[56px] max-h-32 resize-none py-4 px-5 bg-[var(--bg-primary)] border-[var(--border)] text-base"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-7 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors shadow-sm"
            >
              发送
            </button>
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-3 text-center">
            按 Enter 发送，Shift + Enter 换行
          </p>
        </div>
      </div>
    </div>
  );
}
