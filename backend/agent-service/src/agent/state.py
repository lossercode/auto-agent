from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
from enum import Enum
import time
import uuid


class AgentStatus(Enum):
    IDLE = "idle"
    PLANNING = "planning"
    EXECUTING = "executing"
    FINISHED = "finished"
    ERROR = "error"


class MemoryType(Enum):
    SHORT_TERM = "short_term"
    LONG_TERM = "long_term"
    WORKING = "working"


class ActionType(Enum):
    TOOL_CALL = "tool_call"
    FINISH = "finish"
    REASONING = "reasoning"


@dataclass
class MemoryEntry:
    type: MemoryType
    content: str
    timestamp: float = field(default_factory=time.time)
    metadata: Dict[str, Any] = field(default_factory=dict)
    id: str = field(default_factory=lambda: str(uuid.uuid4()))


@dataclass
class ToolResult:
    tool_name: str
    success: bool
    result: Any
    error_message: Optional[str] = None
    timestamp: float = field(default_factory=time.time)


@dataclass
class PlanStep:
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    description: str
    tool_name: Optional[str] = None
    tool_params: Optional[Dict[str, Any]] = None
    completed: bool = False
    result: Optional[Any] = None


@dataclass
class Message:
    role: str
    content: str
    timestamp: float = field(default_factory=time.time)


@dataclass
class AgentAction:
    type: ActionType
    tool_name: Optional[str] = None
    tool_params: Optional[Dict[str, Any]] = None
    thought: Optional[str] = None
    final_response: Optional[str] = None


@dataclass
class AgentState:
    messages: List[Message] = field(default_factory=list)
    plan: List[PlanStep] = field(default_factory=list)
    current_step_index: int = 0
    tool_results: List[ToolResult] = field(default_factory=list)
    memory_entries: List[MemoryEntry] = field(default_factory=list)
    status: AgentStatus = AgentStatus.IDLE
    error: Optional[str] = None
    user_query: Optional[str] = None
    final_response: Optional[str] = None
    max_iterations: int = 10
    current_iteration: int = 0