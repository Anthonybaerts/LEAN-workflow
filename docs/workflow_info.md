# AI-Driven Lean Workflow — Product Development

## Purpose
This workflow enables rapid, high-quality product development using AI agents to maintain consistency, prevent duplication, and ensure systematic execution. The goal is to transform product ideas into implementation-ready plans through structured interviews, validation, and phased planning.

## What This Workflow Solves

### **Traditional Development Problems:**
- Requirements drift and scope creep
- Inconsistent feature planning across team members
- Duplication of work and conflicting implementations
- Poor dependency management leading to blocked development
- Lack of traceability from vision to code
- Manual validation processes that miss edge cases

### **Our Solution:**
- **Structured capture** via AI interviewer that extracts complete requirements
- **Automated validation** preventing inconsistencies before they become problems  
- **Duplication prevention** through global registries and cross-feature checks
- **Dependency-aware sequencing** ensuring features build in correct order
- **Phase-based execution** breaking complex features into manageable steps
- **Continuous QA** at both planning and implementation phases

## Core Documents

### **Foundation Layer (Planning Phase)**
- **MASTER_PRD.md** → Complete product specification with features, ACs, and dependencies
- **MASTER_INDEX.yaml** → Machine-readable feature catalog with metadata and cross-references
- **BUILD_SEQUENCE.md** → Dependency-ordered implementation roadmap 
- **NAVIGATION_FLOW.yaml** → App navigation structure (tabs, stacks, modals, deep links)
- **PROGRESS_LEDGER.yaml** → Execution state tracking and duplication prevention

### **Implementation Layer (Execution Phase)**
- **PRD_Shard_[ID].md** → Focused feature context extracted for implementation
- **IMPLEMENTATION_[ID].md** → Phased execution plan with deliverables and acceptance criteria mapping

## AI Agent Architecture

### **Planning Phase Agents**
- **PRD Author** (`prd_author.mdc`) → Structured interviewing and requirements capture
- **Index Builder** (`index_builder.mdc`) → Feature catalog extraction and normalization  
- **Sequence Planner** (`sequence_planner.mdc`) → Dependency-aware build ordering
- **QA Static** (`qa_static.mdc`) → Foundation document validation (15+ checks)

### **Implementation Phase Agents**
- **Shard Generator** (`shard_generator.mdc`) → Focused feature content extraction
- **Implementation Planner** (`implementation_planner.mdc`) → Execution planning and ledger updates
- **QA Implementation** (`qa_implementation.mdc`) → Implementation readiness validation

### **Orchestration**
- **Maurice** (`maurice.mdc`) → Master orchestrator determining next steps and coordinating agents

## Workflow Pipeline

### **Phase 1: Foundation (Planning)**
1. **PRD Author** interviews product owner → `MASTER_PRD.md` + optional `NAVIGATION_FLOW.yaml`
2. **Index Builder** extracts feature catalog → `MASTER_INDEX.yaml`
3. **Sequence Planner** computes build order → `BUILD_SEQUENCE.md`
4. **QA Static** validates consistency → PASS/FAIL with specific fixes

### **Phase 2: Feature Implementation (Execution)**
5. **Shard Generator** extracts next feature → `PRD_Shard_[ID].md`
6. **Implementation Planner** creates execution plan → `IMPLEMENTATION_[ID].md` + ledger updates
7. **QA Implementation** validates readiness → PASS/FAIL with gap identification
8. **Execute implementation** → Code development following the plan
9. **Repeat** for next feature in sequence

## Key Innovations

### **Duplication Prevention System**
- **Global registries** track all deliverables and touched areas across features
- **Semantic conflict detection** flags similar functionality across features
- **Atomic ledger updates** prevent race conditions in parallel development

### **Dependency-Aware Execution**
- **Topological ordering** ensures features build in correct dependency order
- **Readiness validation** confirms all prerequisites are complete before starting
- **Cascade regeneration** automatically updates downstream docs when dependencies change

### **Quality Gates**
- **Two-tier QA system** validates both planning phase and implementation phase
- **Schema-driven validation** catches structural errors automatically
- **Cross-document consistency** ensures all artifacts stay synchronized

### **Context Management**
- **Focused shards** provide implementation agents with exactly needed context
- **Template-driven outputs** ensure consistent structure across all artifacts
- **Traceability chains** maintain links from high-level vision to specific implementation steps

## Principles

### **AI-First Design**
- **Machine-readable formats** (YAML) enable precise agent coordination
- **Structured interviews** capture complete requirements systematically
- **Automated validation** catches human errors before they propagate

### **Lean Execution**
- **One feature at a time** prevents context switching and integration conflicts
- **Phased implementation** breaks complex features into 2-6 manageable steps
- **Just-in-time planning** generates implementation details only when ready to execute

### **Systematic Quality**
- **Fail-fast validation** stops pipeline on first error with specific fix guidance
- **Comprehensive coverage** validates every document relationship and constraint
- **Execution readiness** ensures plans are complete before development begins

## Success Metrics
- **Zero duplicate implementations** through global registry enforcement
- **Zero blocked features** through dependency validation
- **Consistent execution** through template-driven planning
- **Complete traceability** from product vision to implementation details
