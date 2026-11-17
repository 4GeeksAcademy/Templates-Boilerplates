---
name: Development Rule
description: Keep development changes focused and verify them with the narrowest relevant check.
applyTo: "**"
---

# Development Rule

## Scope

This rule is always active for every file in the repository through the `**` file pattern. It does not require the agent to be explicitly invoked.

## Rule

Before changing code or configuration, inspect the nearest relevant implementation and its local conventions. State a concrete expectation for the change and identify a focused check that could disprove it. Make the smallest change that addresses the task, preserve unrelated user changes, and run that focused check immediately after editing. Do not broaden the change or validation scope unless the check reveals a specific need.

For TrackFlow-specific work, use `CONTEXT.md` as the source of truth and keep related memory-bank and skill documentation aligned with it. Clearly distinguish existing systems and manual processes from proposed capabilities. Do not invent a target stack, metric definition, reporting timezone, source data, or implementation status.

Place work according to the repository's UI/backend boundary:

- Put the public-facing website frontend in `uis/website`.
- Put internal administration and operations frontends in `uis/backoffice`.
- Put backend APIs, business logic, and background workers in `services/`, with each specific service in its own subfolder and documented there.
- Keep presentation and user interaction in the UI projects; put backend behavior and queue consumers in services. Connect them through documented interfaces rather than embedding backend responsibilities in a frontend.

These are organizational boundaries, not claims that these projects or capabilities already exist. Follow the relevant folder README, and do not infer a stack or service design that the project documentation has not chosen.
