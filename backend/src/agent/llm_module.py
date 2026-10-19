from typing import List, Dict, Any, Optional
from .state import AgentState, AgentAction, ActionType, PlanStep


class LLMModule:
    def __init__(self, agent_state: AgentState):
        self._state = agent_state

    async def generate_response(self, prompt: str) -> str:
        pass

    async def extract_tool_call(self, response: str) -> Optional[Dict[str, Any]]:
        pass

    async def summarize_plan(self, plan: List[PlanStep]) -> str:
        pass

    async def decide_next_action(self, context: str, available_tools: List[str]) -> AgentAction:
        pass