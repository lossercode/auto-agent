"use client";

import { useState } from "react";

interface Skill {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: string;
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "1",
      name: "股票分析",
      description: "分析股票走势、财务报表和技术指标",
      enabled: true,
      category: "analysis",
    },
    {
      id: "2",
      name: "新闻聚合",
      description: "实时抓取和汇总财经新闻",
      enabled: true,
      category: "data",
    },
    {
      id: "3",
      name: "风险评估",
      description: "评估投资风险和仓位管理建议",
      enabled: false,
      category: "risk",
    },
    {
      id: "4",
      name: "报告生成",
      description: "自动生成投资分析报告",
      enabled: true,
      category: "output",
    },
    {
      id: "5",
      name: "量化策略",
      description: "实现和回测量化交易策略",
      enabled: false,
      category: "strategy",
    },
  ]);

  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "全部" },
    { id: "analysis", label: "分析" },
    { id: "data", label: "数据" },
    { id: "risk", label: "风险" },
    { id: "output", label: "输出" },
    { id: "strategy", label: "策略" },
  ];

  const filteredSkills =
    filter === "all"
      ? skills
      : skills.filter((s) => s.category === filter);

  const handleToggle = (skillId: string) => {
    setSkills((prev) =>
      prev.map((s) =>
        s.id === skillId ? { ...s, enabled: !s.enabled } : s
      )
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="h-16 px-8 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Skills</h1>
          <p className="text-sm text-[var(--text-secondary)]">管理 Agent 技能插件</p>
        </div>
        <button className="px-4 py-2 bg-[var(--bg-elevated)] hover:bg-[var(--border)] rounded-lg text-sm transition-colors border border-[var(--border)]">
          安装新技能
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-[var(--bg-primary)]">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Filter */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === cat.id
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] border border-[var(--border)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="text-2xl font-bold text-[var(--accent)]">
                {skills.filter((s) => s.enabled).length}
              </div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">已启用</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="text-2xl font-bold">
                {skills.filter((s) => !s.enabled).length}
              </div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">未启用</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="text-2xl font-bold">{skills.length}</div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">总计</div>
            </div>
          </div>

          {/* Skills List */}
          <section>
            <h2 className="text-base font-medium mb-3 text-[var(--text-primary)]">技能列表</h2>
            <div className="space-y-2">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          skill.enabled
                            ? "bg-[var(--accent-light)]"
                            : "bg-[var(--bg-elevated)]"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            skill.enabled
                              ? "text-[var(--accent)]"
                              : "text-[var(--text-muted)]"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-[var(--text-primary)]">{skill.name}</h3>
                          <span className="text-xs px-2 py-0.5 bg-[var(--bg-elevated)] rounded text-[var(--text-secondary)]">
                            {skill.category}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggle(skill.id)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          skill.enabled
                            ? "bg-[var(--accent)]"
                            : "bg-[var(--bg-elevated)]"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${
                            skill.enabled ? "left-5" : "left-0.5"
                          }`}
                        />
                      </button>
                      <button className="p-1.5 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors text-[var(--text-secondary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
