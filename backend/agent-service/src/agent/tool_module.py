from typing import List, Dict, Any
from .state import AgentState, ToolResult


class ToolModule:
    def __init__(self, agent_state: AgentState):
        self._state = agent_state
        self._tools: Dict[str, Any] = {}

    def register_tool(self, tool_name: str, tool_func: Any):
        self._tools[tool_name] = tool_func

    def get_available_tools(self) -> List[str]:
        return list(self._tools.keys())

    async def execute_tool(self, tool_name: str, params: Dict[str, Any]) -> ToolResult:
        pass