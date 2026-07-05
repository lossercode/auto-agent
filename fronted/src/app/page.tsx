"use client";

import { useState } from "react";
import Sidebar, { NavItem } from "@/components/Sidebar";
import Chat from "@/components/Chat";
import ModelSettings from "@/components/ModelSettings";
import KnowledgeBase from "@/components/KnowledgeBase";
import SkillsManager from "@/components/SkillsManager";

export default function Home() {
  const [activeItem, setActiveItem] = useState<NavItem>("chat");

  const renderContent = () => {
    switch (activeItem) {
      case "chat":
        return <Chat />;
      case "models":
        return <ModelSettings />;
      case "knowledge":
        return <KnowledgeBase />;
      case "skills":
        return <SkillsManager />;
      default:
        return <Chat />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-[var(--bg-primary)]">
      <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
}
