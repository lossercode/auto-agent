"use client";

import { useState } from "react";

interface Model {
  id: string;
  name: string;
  provider: string;
  status: "active" | "inactive";
  temperature: number;
  maxTokens: number;
}

export default function ModelSettings() {
  const [models, setModels] = useState<Model[]>([
    {
      id: "1",
      name: "gpt-4",
      provider: "OpenAI",
      status: "active",
      temperature: 0.7,
      maxTokens: 4096,
    },
    {
      id: "2",
      name: "claude-3-opus",
      provider: "Anthropic",
      status: "inactive",
      temperature: 0.7,
      maxTokens: 4096,
    },
    {
      id: "3",
      name: "deepseek-chat",
      provider: "DeepSeek",
      status: "inactive",
      temperature: 0.7,
      maxTokens: 4096,
    },
  ]);

  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);

  const handleToggleStatus = (modelId: string) => {
    setModels((prev) =>
      prev.map((m) =>
        m.id === modelId
          ? { ...m, status: m.status === "active" ? "inactive" : "active" }
          : m
      )
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="h-18 px-8 flex items-center border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">模型设置</h1>
          <p className="text-base text-text-secondary">配置 AI 模型参数</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-[var(--bg-primary)]">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Model List */}
          <section>
            <h2 className="text-xl font-medium mb-4 text-[var(--text-primary)]">可用模型</h2>
            <div className="space-y-3">
              {models.map((model) => (
                <div
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedModel.id === model.id
                      ? "border-[var(--accent)] bg-[var(--bg-surface)] shadow-sm"
                      : "border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium">{model.name}</h3>
                        <span className="text-sm px-3 py-1 bg-[var(--bg-elevated)] rounded-lg text-[var(--text-secondary)]">
                          {model.provider}
                        </span>
                      </div>
                      <p className="text-base text-[var(--text-muted)] mt-2">
                        Temperature: {model.temperature} | Max Tokens: {model.maxTokens}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(model.id);
                      }}
                      className={`px-5 py-2.5 rounded-xl text-base font-medium transition-colors ${
                        model.status === "active"
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]"
                      }`}
                    >
                      {model.status === "active" ? "使用中" : "启用"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Model Configuration */}
          <section>
            <h2 className="text-xl font-medium mb-4 text-[var(--text-primary)]">模型配置</h2>
            <div className="p-7 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-sm space-y-7">
              {/* Temperature */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-base font-medium">Temperature</label>
                  <span className="text-base text-[var(--text-secondary)] font-mono">
                    {selectedModel.temperature}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={selectedModel.temperature}
                  onChange={(e) =>
                    setSelectedModel((prev) => ({
                      ...prev,
                      temperature: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full h-2.5 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                />
                <div className="flex justify-between text-sm text-[var(--text-muted)] mt-2">
                  <span>精确</span>
                  <span>创意</span>
                </div>
              </div>

              {/* Max Tokens */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-base font-medium">最大 Token 数</label>
                  <span className="text-base text-[var(--text-secondary)] font-mono">
                    {selectedModel.maxTokens}
                  </span>
                </div>
                <input
                  type="range"
                  min="512"
                  max="8192"
                  step="512"
                  value={selectedModel.maxTokens}
                  onChange={(e) =>
                    setSelectedModel((prev) => ({
                      ...prev,
                      maxTokens: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2.5 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                />
              </div>

              {/* Actions */}
              <div className="pt-5 border-t border-[var(--border)] flex gap-3">
                <button className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-colors shadow-sm">
                  保存配置
                </button>
                <button className="px-5 py-2.5 bg-[var(--bg-elevated)] hover:bg-[var(--border)] text-[var(--text-secondary)] rounded-xl transition-colors border border-[var(--border)]">
                  重置
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
