# Agent Instructions

## Read at the Start of Every Session

Before working on a task, read these files in this order:

1. `AGENTS.md` for these working rules.
2. `memory-bank/projectbrief.md` for the business context, project problem, and objectives.
3. `memory-bank/techContext.md` for the current systems, technical constraints, and decisions (including decisions that have not yet been made).
4. `memory-bank/progress.md` for the documented current status and anticipated next steps.

Treat `CONTEXT.md` as the company-context source of truth when a task requires details beyond the memory bank or when the documents conflict. Do not assume that anticipated work has been implemented.

For company-specific work, keep the memory bank and agent guidance consistent with `CONTEXT.md`. Distinguish current systems and processes from requested capabilities; do not assume a target stack, KPI formula, reporting timezone, or deployed automation that the source does not specify.

## Required Workflow Before Every Commit

Do not create a commit unless the developer explicitly requests one. When a commit is requested, complete these steps in order:

1. Check the current branch and working-tree status. Preserve pre-existing user changes; do not include them unless the developer explicitly asks.
2. Stage only the files required for the requested task. Avoid broad staging commands that could include unrelated work.
3. Review the staged diff in full and confirm that every staged change belongs to the task.
4. Run the relevant tests, lint checks, type checks, or other project validation for the changed files. Report any unavailable or failing checks before proceeding.
5. Inspect the staged changes for secrets, credentials, personal data, generated artifacts, and accidental unrelated edits. Remove any such material from the staged changes.
6. Recheck the staged diff and status, then create the commit using a clear, task-specific message.

If any step reveals unrelated changes, sensitive content, or an unexpected impact, stop and ask the developer before committing.

## Protected Paths: Explicit Confirmation Required

Do not modify the following paths without explicit developer confirmation for the specific change. A task that explicitly requests a change to one of these paths counts as confirmation for that requested scope only.

- `.git/`: repository internals and history.
- `.devcontainer/`: development-container and environment configuration.
- `infra/`: infrastructure, deployment, and operational configuration.
- `data/raw/`: original source datasets, which must remain unmodified.
- `CONTEXT.md` and `CONTEXT.es.md`: company context and its source-of-truth documentation.
- `.env` files, secret stores, credentials, private keys, and other files containing secrets, wherever they are located. Never expose secret values in output or commits, even when permission to edit is given.

Do not edit generated, vendored, or build-output files as a substitute for changing their source. If the correct source path is unclear, ask before editing. Explicit confirmation to modify a protected path does not authorize unrelated changes or disclosure of secrets.