# AudioBook Converter - Phase 1 MVP

## Goal

Build the core functionality: User uploads PDF → System extracts text → Converts to audio (Google TTS) → User downloads MP3.

> **Focus**: Core business logic first. Payment integration deferred to Phase 2.

---

## Tech Stack

| Layer         | Technology              | Notes                           |
| ------------- | ----------------------- | ------------------------------- |
| **Framework** | Next.js 16 (App Router) | Server Actions, RSC             |
| **State**     | TanStack Query v5       | Install when needed             |
| **ORM**       | Prisma                  | Install when needed             |
| **Database**  | Neon (PostgreSQL)       | Serverless, free tier           |
| **Storage**   | Cloudflare R2           | S3-compatible, egress FREE      |
| **TTS**       | Google Cloud TTS        | VI + EN support                 |
| **Queue**     | Inngest                 | Background jobs                 |
| **Auth**      | Clerk                   | Install when needed (Phase 1.5) |

> **Philosophy**: Install dependencies incrementally per feature. No upfront bloat.

---

## Features Scope

### ✅ Phase 1 (Core Business)

| Feature            | Priority | Description             |
| ------------------ | -------- | ----------------------- |
| Upload PDF         | P0       | Drag & drop, save to R2 |
| Extract Text       | P0       | pdf-parse, store in DB  |
| Preview Text       | P1       | Show extracted content  |
| Convert to Audio   | P0       | Google TTS → MP3        |
| Download MP3       | P0       | Single file download    |
| Language Selection | P0       | Vietnamese / English    |

### ⏸️ Deferred (Phase 2+)

| Feature            | Notes                             |
| ------------------ | --------------------------------- |
| Payment            | Polar.sh / Sepay (evaluate later) |
| Auth               | Clerk (add after core works)      |
| Chapter Splitting  | Auto-detect chapters              |
| Voice Selection    | Male/Female, speed                |
| Streaming Playback | Listen on web                     |

---

## Architecture

```
src/
├── features/
│   ├── upload/           # PDF upload & R2 storage
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   ├── extraction/       # Text extraction from PDF
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   └── conversion/       # TTS conversion
│       ├── components/
│       ├── services/
│       └── types/
├── shared/
│   ├── components/       # UI components
│   └── lib/              # Utils, API clients
└── app/                  # Routes only
```

---

## Tasks (Incremental Approach)

### Phase 1.1: Database Setup

**Install**: `prisma @prisma/client`

- [x] Run `pnpm add -D prisma && pnpm add @prisma/client` → Success
- [x] Run `npx prisma init` → Creates schema.prisma
- [x] Configure Neon connection string in `.env.local`
- [x] Create `Document` model → `npx prisma migrate dev` succeeds

```prisma
model Document {
  id            String   @id @default(cuid())
  fileName      String
  fileUrl       String
  extractedText String?  @db.Text
  status        Status   @default(PENDING)
  audioUrl      String?
  createdAt     DateTime @default(now())
}

enum Status {
  PENDING
  EXTRACTING
  EXTRACTED
  CONVERTING
  COMPLETED
  FAILED
}
```

**Verify**: `npx prisma studio` shows Document table

---

### Phase 1.2: Upload Feature

**Install**: `@aws-sdk/client-s3` (R2 compatible)

- [ ] Setup R2 bucket and get credentials → Add to `.env.local`
- [ ] Create `src/features/upload/services/storage-service.ts` → Upload file returns URL
- [ ] Create `src/features/upload/components/UploadZone.tsx` → Drag & drop UI
- [ ] Create Server Action `uploadPdf()` → Saves to R2 + creates DB record
- [ ] Integrate with home page → User can upload PDF

**Verify**: Upload PDF → Check R2 bucket → Check DB record

---

### Phase 1.3: Extraction Feature

**Install**: `pdf-parse`

- [ ] Create `src/features/extraction/services/pdf-service.ts` → Extract text from PDF
- [ ] Create Server Action `extractText(documentId)` → Updates Document.extractedText
- [ ] Create `src/features/extraction/components/TextPreview.tsx` → Display text
- [ ] Auto-trigger extraction after upload

**Verify**: Upload PDF → See extracted text on screen

---

### Phase 1.4: Conversion Feature

**Install**: `@google-cloud/text-to-speech inngest`

- [ ] Setup Google Cloud TTS credentials → Add to `.env.local`
- [ ] Setup Inngest project → Add API key to `.env.local`
- [ ] Create `src/features/conversion/services/tts-service.ts` → Convert text to audio buffer
- [ ] Create Inngest function `convertToAudio` → Background processing
- [ ] Chunk text (5000 bytes limit) → Concatenate audio
- [ ] Upload MP3 to R2 → Update Document.audioUrl
- [ ] Create download page `/download/[id]` → Stream MP3 file

**Verify**: Upload PDF → Wait → Download MP3 → Audio plays correctly

---

### Phase 1.5: Polish & Auth (Optional for MVP)

**Install**: `@clerk/nextjs` (when ready)

- [ ] Add loading states during processing
- [ ] Add error handling UI
- [ ] Add Clerk auth (optional, can skip for MVP)

---

### Phase X: Verification

- [ ] Run `pnpm type-check` → No TypeScript errors
- [ ] Run `pnpm lint` → No ESLint errors
- [ ] Run `pnpm build` → Build succeeds
- [ ] E2E test: Upload → Extract → Convert → Download → Audio plays

---

## Done When

- [ ] User uploads PDF file successfully
- [ ] System extracts text and displays preview
- [ ] System converts text to MP3 audio
- [ ] User downloads working MP3 file
- [ ] All code follows Feature-Based architecture

---

## Environment Variables

```env
# Database (Neon)
DATABASE_URL="postgresql://..."

# Storage (Cloudflare R2)
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME=""

# Google Cloud TTS
GOOGLE_APPLICATION_CREDENTIALS=""
# or
GOOGLE_TTS_API_KEY=""

# Inngest
INNGEST_EVENT_KEY=""
INNGEST_SIGNING_KEY=""
```

---

## Notes

- **Google TTS limit**: 5000 bytes/request → need chunking logic
- **R2 egress**: FREE (unlike S3) → save cost on downloads
- **Inngest free tier**: 25,000 runs/month → sufficient for MVP
- **No auth for MVP**: Anyone can use → add Clerk later for rate limiting
