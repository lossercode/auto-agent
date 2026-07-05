from .state import AgentState, AgentStatus, MemoryType, ActionType
from .llm_module import LLMModule
from .memory_module import MemoryModule
from .tool_module import ToolModule
from .planning_module import PlanningModule


class Agent:
    def __init__(self):
        self._state = AgentState()
        self._llm_module = LLMModule(self._state)
        self._memory_module = MemoryModule(self._state)
        self._tool_module = ToolModule(self._state)
        self._planning_module = PlanningModule(self._state)

    @property
    def state(self) -> AgentState:
        return self._state

    async def run(self, user_query: str) -> AgentState:
        self._state.user_query = user_query
        self._state.status = AgentStatus.PLANNING
        self._state.current_iteration = 0

        try:
            available_tools = self._tool_module.get_available_tools()
            plan = await self._planning_module.create_plan(user_query, available_tools)
            self._state.plan = plan

            self._state.status = AgentStatus.EXECUTING

            while self._state.current_iteration < self._state.max_iterations:
                self._state.current_iteration += 1

                context = self._build_context()
                action = await self._llm_module.decide_next_action(context, available_tools)

                if action.type == ActionType.FINISH:
                    self._state.final_response = action.final_response or \
                        await self._planning_module.generate_final_summary()
                    self._state.status = AgentStatus.FINISHED
                    break

                if action.type == ActionType.TOOL_CALL and action.tool_name:
                    result = await self._tool_module.execute_tool(action.tool_name, action.tool_params or {})
                    self._state.tool_results.append(result)

                    if result.success:
                        self._memory_module.add_memory(
                            content=str(result.result),
                            memory_type=MemoryType.WORKING
                        )

                    for step in self._state.plan:
                        if step.tool_name == action.tool_name:
                            step.completed = result.success
                            step.result = result.result

                    await self._planning_module.update_plan(action.tool_name, result.result)

                is_complete = await self._planning_module.evaluate_progress()
                if is_complete:
                    final_response = await self._planning_module.generate_final_summary()
                    self._state.final_response = final_response
                    self._state.status = AgentStatus.FINISHED
                    break

            if self._state.status == AgentStatus.EXECUTING:
                self._state.final_response = await self._planning_module.generate_final_summary()
                self._state.status = AgentStatus.FINISHED

            self._memory_module.add_memory(
                content=f"User: {user_query}\nResponse: {self._state.final_response}",
                memory_type=MemoryType.SHORT_TERM
            )

        except Exception as e:
            self._state.error = str(e)
            self._state.status = AgentStatus.ERROR

        return self._state

    def _build_context(self) -> str:
        context_parts = []

        if self._state.user_query:
            context_parts.append(f"User Query: {self._state.user_query}")

        if self._state.plan:
            plan_str = "\n".join(
                f"Step {i+1}: {step.description} (completed: {step.completed})"
                for i, step in enumerate(self._state.plan)
            )
            context_parts.append(f"Current Plan:\n{plan_str}")

        if self._state.tool_results:
            recent_results = self._state.tool_results[-3:]
            results_str = "\n".join(
                f"Tool: {r.tool_name}, Success: {r.success}, Result: {str(r.result)[:200]}"
                for r in recent_results
            )
            context_parts.append(f"Recent Tool Results:\n{results_str}")

        if self._state.memory_entries:
            recent_memories = [m for m in self._state.memory_entries if m.type == MemoryType.WORKING][-5:]
            memories_str = "\n".join(f"- {m.content[:100]}" for m in recent_memories)
            context_parts.append(f"Working Memory:\n{memories_str}")

        return "\n\n".join(context_parts)

    def register_tool(self, tool_name: str, tool_func: Any):
        self._tool_module.register_tool(tool_name, tool_func)