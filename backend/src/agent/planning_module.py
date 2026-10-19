from typing import List
from .state import AgentState, PlanStep


class PlanningModule:
    def __init__(self, agent_state: AgentState):
        self._state = agent_state

    async def create_plan(self, user_query: str, available_tools: List[str]) -> List[PlanStep]:
        pass

    async def update_plan(self, step_id: str, result: Any):
        pass

    async def evaluate_progress(self) -> bool:
        pass

    async def generate_final_summary(self) -> str:
        pass