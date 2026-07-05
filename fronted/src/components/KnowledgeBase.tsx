"use client";

import { useState } from "react";

interface KnowledgeSource {
  id: string;
  name: string;
  type: "file" | "url" | "api";
  status: "indexed" | "indexing" | "error";
  size: string;
  lastUpdated: Date;
}

export default function KnowledgeBase() {
  const [sources, setSources] = useState<KnowledgeSource[]>([
    {
      id: "1",
      name: "股票基础知识手册.pdf",
      type: "file",
      status: "indexed",
      size: "2.4 MB",
      lastUpdated: new Date("2024-01-15"),
    },
    {
      id: "2",
      name: "SEC 官方财报数据库",
      type: "api",
      status: "indexed",
      size: "-",
      lastUpdated: new Date("2024-01-20"),
    },
    {
      id: "3",
      name: "财经新闻 RSS 源",
      type: "url",
      status: "indexing",
      size: "-",
      lastUpdated: new Date(),
    },
  ]);

  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="h-16 px-8 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">知识库</h1>
          <p className="text-sm text-[var(--text-secondary)]">管理 Agent 知识来源</p>
        </div>
        <button
          onClick={() => setIsUploading(true)}
          className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          添加数据源
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-[var(--bg-primary)]">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="text-2xl font-bold text-[var(--accent)]">3</div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">数据源</div>
            </div>
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="text-2xl font-bold">2.4 MB</div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">已索引</div>
            </div>
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">准确率</div>
            </div>
          </div>

          {/* Sources List */}
          <section>
            <h2 className="text-base font-medium mb-3 text-[var(--text-primary)]">数据源列表</h2>
            <div className="space-y-2">
              {sources.map((source) => (
                <div
                  key={source.id}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          source.type === "file"
                            ? "bg-blue-500/10 text-blue-600"
                            : source.type === "url"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-purple-500/10 text-purple-600"
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-[var(--text-primary)]">{source.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-1">
                          <span className="uppercase px-2 py-0.5 bg-[var(--bg-elevated)] rounded">
                            {source.type}
                          </span>
                          <span>{source.size}</span>
                          <span>更新于 {source.lastUpdated.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          source.status === "indexed"
                            ? "bg-[var(--success-light)] text-[var(--success)]"
                            : source.status === "indexing"
                            ? "bg-[var(--warning-light)] text-[var(--warning)]"
                            : "bg-[var(--danger-light)] text-[var(--danger)]"
                        }`}
                      >
                        {source.status === "indexed"
                          ? "已索引"
                          : source.status === "indexing"
                          ? "索引中..."
                          : "错误"}
                      </div>
                      <button className="p-1.5 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors text-[var(--text-secondary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-base font-medium mb-3 text-[var(--text-primary)]">快速操作</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-left transition-colors group">
                <div className="flex items-center gap-3 mb-1.5">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="font-medium text-[var(--text-primary)]">上传文件</span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">支持 PDF、Markdown、TXT</p>
              </button>
              <button className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-left transition-colors group">
                <div className="flex items-center gap-3 mb-1.5">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="font-medium text-[var(--text-primary)]">添加 URL</span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">从网页抓取内容</p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
