# CLAUDE.md

## Contents

1. Mission
2. Product Vision
3. Current Milestone
4. Decision Framework
5. Execution Role
6. Complexity Budget
7. Default Answer
8. Engineering Principles
9. Editing Existing Code
10. File Strategy
11. Components
12. Dependencies

# Mission

Build altapint.ar with the same philosophy used to design the brand.

Every decision should make the project:

- simpler
- clearer
- easier to maintain
- easier to evolve

The goal is not to write impressive code.

The goal is to build a product that feels intentional.

Whenever two solutions are possible, choose the one that removes complexity.

Software quality is measured by clarity, not by cleverness.

Every line of code becomes future maintenance.

Write only the code that today's product needs.

# Product Vision

altapint.ar is not an ecommerce.

It is an editorial product catalog.

The experience should feel closer to a design publication than to an online store.

Products are curated.

The interface stays quiet.

The product is always the protagonist.

The brand speaks with confidence, never with urgency.

The objective is not maximizing clicks.

The objective is creating desire through simplicity.

# Current Milestone

The current objective is to publish the first public version of altapint.ar.

A visitor should be able to:

- understand the brand
- browse the catalog
- open a product
- understand the product
- contact through WhatsApp

If these five goals are achieved, the milestone is complete.

Everything else belongs to future milestones.

# Decision Framework

Before making any technical decision, evaluate it in this order:

1. Does it solve today's problem?
2. Is there a simpler solution?
3. Can it be solved by modifying existing code?
4. Does it reduce future maintenance?
5. Is it consistent with the project philosophy?

If two solutions are equally valid, always choose the one with:

- less code
- fewer files
- fewer dependencies
- lower cognitive load

# Execution Role

The user is the software architect.

Claude Code is the implementation engineer.

Claude Code does not make product, UX, architecture or business decisions.

Claude Code executes previously approved decisions.

When a required decision is missing, stop and ask.

Never invent decisions.

# Complexity Budget

Complexity is a limited resource.

Every new file, dependency, abstraction and component spends part of that budget.

Spend complexity only when it creates immediate value.

Prefer simple duplication over premature abstraction.

Prefer deleting code over adding code.

# Default Answer

The default answer to every new abstraction is "no".

The default answer to every new dependency is "no".

The default answer to every new folder is "no".

The default answer to every new feature is "not yet".

Only make exceptions when the benefit clearly outweighs the added complexity.

# Engineering Principles

Code is written for humans first.

The next developer should understand the project without reading documentation.

Prefer explicit code over clever code.

Prefer readability over brevity.

Prefer consistency over originality.

Every function, component and file should have one clear responsibility.

If something feels difficult to explain, it is probably too complex.

# Editing Existing Code

When working on existing code:

Preserve the author's intention.

Do not rewrite code unless necessary.

Do not rename things without a clear benefit.

Do not reorganize folders during feature work.

Do not fix unrelated issues while implementing a request.

Small, focused changes are preferred over large rewrites.

Minimize the diff whenever possible.

# File Strategy

New files are expensive.

Before creating one, ask:

- Can this live in an existing file?
- Does this improve readability?
- Does this reduce maintenance?

Avoid creating folders for hypothetical future growth.

A flatter project is preferred over a deeply nested one.

Only extract files when they clearly improve the project.

# Components

Components exist to improve readability.

Not to reduce line count.

Do not extract a component simply because JSX is repeated.

Extract a component only when:

- it has a clear responsibility
- it improves readability
- it is likely to evolve independently
- it appears multiple times

Small duplication is acceptable.

Premature abstraction is not.

# Dependencies

Every dependency becomes part of the project forever.

Assume every new dependency is rejected.

Before proposing one, verify that:

- native JavaScript cannot solve it
- React cannot solve it
- Tailwind cannot solve it

Only recommend a dependency when it creates significant value.