# Workflow kit (agent-driven, static docs)

Pipeline:
1) PRD author → MASTER_PRD.md
2) Index builder → MASTER_INDEX.yaml
3) Sequence planner → BUILD_SEQUENCE.md (YAML `sequence:` header)
4) QA (agent) → static checks only (no runtime)
5) prd shard generator
6) Implementation planner → PRD_Shard_*.md + IMPLEMENTATION_*.md ---> dev agent
7) Repeat per next sequence ID

Single source of truth for navigation: specs/NAVIGATION_FLOW.yaml (+ schema)

What to do next (call the orchestrator):
Use Maurice (`workflow/agents/maurice.mdc`). He decides and explains the next step.

- If PRD missing/incomplete → prd_author
- Else if Index missing/out-of-sync → index_builder
- Else if Sequence missing/invalid → sequence_planner
- Else run qa_static; if PASS → implementation_planner for first unimplemented ID in sequence

