from typing import List, Dict, Any, Optional
from .state import AgentState, MemoryType, MemoryEntry


class MemoryModule:
    def __init__(self, agent_state: AgentState):
        self._state = agent_state

    def add_memory(self, content: str, memory_type: MemoryType, metadata: Dict[str, Any] = None):
        entry = MemoryEntry(
            type=memory_type,
            content=content,
            metadata=metadata or {}
        )
        self._state.memory_entries.append(entry)

    def retrieve_memory(self, query: str, memory_type: Optional[MemoryType] = None) -> List[MemoryEntry]:
        pass

    def update_memory(self, entry_id: str, content: str):
        pass

    def delete_memory(self, entry_id: str):
        pass