---
trigger: always_on
---

# 🏗️ AUDIO-BOOK Project Rules & Architecture

This file contains MANDATORY rules for all AI assistants and developers working on this project.
Strict adherence to these guidelines is required.

## 🏗️ ARCHITECTURE (FEATURE-BASED)

We follow a strictly **Feature-Based (Vertical Slice)** architecture.

### Directory Structure
```
src/
├── shared/           # ONLY shared utilities, components, libs (Generic, no business logic)
├── features/         # ALL business logic goes here
│   ├── auth/         # Authentication feature
│   ├── dashboard/    # Dashboard feature
│   ├── player/       # Audio player feature
│   └── [feature]/    # Future features
└── app/             # ONLY Next.js routes (layout.tsx, page.tsx)
```

### Feature Module Structure (REQUIRED)
Each feature folder in `features/[name]/` MUST follow this structure:

```
features/[feature-name]/
├── components/       # UI components specific to this feature
├── hooks/           # Custom hooks for this feature
├── pages/           # Page components (imported by app routes)
├── services/        # Business logic & API calls
├── repositories/    # Data access layer (Prisma/DB queries)
├── types/           # TypeScript type definitions
├── validations/     # Zod schemas for validation
├── store/           # State management (Zustand/Context features)
└── index.ts         # PUBLIC API: Only export what is needed outside
```

---

## 📋 CODING STANDARDS (STRICT)

### 1. TypeScript Rules
- ✅ **ALWAYS** use TypeScript strict mode.
- ❌ **NEVER** use `any` type. Use `unknown` if type is truly ambiguous, then narrow it.
- ✅ **MUST** type all props, functions, arguments, and return values.
- ✅ **ALWAYS** use `interface` for object types (extendable), `type` for unions/primitives.
- ✅ **PREFER** type inference where obvious (e.g., `const x = 5` is better than `const x: number = 5`).

### 2. Component Rules
- ✅ **ALWAYS** use Functional Components with Hooks.
- ✅ **MUST** export default for ALL components: `export default function ComponentName() {}`.
- ✅ **ALWAYS** destructure props: `function Card({ title, children }: CardProps)`.
- ✅ **USE** PascalCase for component filenames: `UserProfile.tsx`.
- ✅ **PREFER** Composition over Inheritance.

### 3. Server vs Client Components (Performance Priority)
- ✅ **PRIORITIZE** Server Components (RSC) by default.
- ✅ **ADD** `"use client"` ONLY when necessary (Event listeners, Hooks, Browser APIs).
- ✅ **SEPARATE** Client logic into smaller "Island" components to keep parent pages Server-side.

### 4. React Import Patterns
- ✅ **ALWAYS** import hooks intentionally: `import { useState } from "react"`.
- ❌ **NEVER** use `import React from "react"` (unless strictly required by legacy types).
- ❌ **NEVER** use namespace imports `React.useState` (increases bundle size/tree-shaking issues).

### 5. File Naming Conventions
- **Components**: `PascalCase.tsx` (e.g., `AudioPlayer.tsx`)
- **Services**: `kebab-case.ts` (e.g., `player-service.ts`)
- **Types**: `kebab-case.ts` (e.g., `player-types.ts`)
- **Hooks**: `use-kebab-case.ts` (e.g., `use-audio-player.ts`)
- **Folders**: `kebab-case` (e.g., `audio-player/`)

---

## 🧪 TESTING & QUALITY
- **Linting**: Ensure `pnpm lint` passes before suggesting code.
- **Formatting**: Adhere to Prettier config.
- **Type Check**: Ensure `pnpm type-check` passes.

---

## 🚀 TECH STACK
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4 + Shadcn/UI
- **State**: React Hooks + Server State (RSC)
- **Package Manager**: pnpm

---

**AI INSTRUCTION**: When asked to implement a feature, ALWAYS generate the files inside `src/features/[feature-name]` first, then link them in `app/`.