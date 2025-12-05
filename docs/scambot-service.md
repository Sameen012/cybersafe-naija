# ScamBot Honeypot Service

## Objective
Capture and weaponize scam evidence by ingesting WhatsApp text exports, extracting all contacts and links, and automatically updating the CyberSafe Naija blocklist so the community sees emerging threats in near real time.

## High-Level Flow
1. **Upload surface (frontend)**
   - Victim drops a `.txt` file generated from WhatsApp `Export Chat` (without media).
   - File is posted to `POST /honeypot/uploads` with metadata (`reportId`, `channel`, `submittedBy`).
2. **Ingestion API (backend service: ScamBot)**
   - Validates MIME and size (<5 MB).
   - Stores raw text in `scam_honeypot_uploads` table (for auditing) and enqueues a parsing job (BullMQ / RabbitMQ).
3. **Parser worker**
   - Streams the text line-by-line to avoid loading big files in memory.
   - Applies regex extractors:
     - **Phone numbers (Nigeria + international)**: `/((?:\+?234|0)\d{10,13})/g`
     - **URL / handle detection**: `/https?:\/\/[^\s]+/gi` plus `@[A-Za-z0-9_]{3,30}` for IG/Twitter handles.
   - Normalizes MSISDNs to `+234XXXXXXXXXX`, deduplicates, and attaches context (line snippet, timestamp from chat if present).
4. **Blocklist population**
   - For each artifact, upsert into `scam_blocklist` with fields: `indicator`, `indicatorType (phone|url|handle)`, `firstSeen`, `lastSeen`, `sourceUploadId`, `status`.
   - If indicator already exists, increment `sightings` count and refresh `lastSeen`.
5. **Feedback loop**
   - Worker emits `scambot.indicator.created` events so the alert system can display breaking banners / send moderator notifications.

## Service Structure
```
honeypot/
├─ api/
│  ├─ uploadRouter.js          # POST /honeypot/uploads
│  └─ validators/uploadSchema.js
├─ workers/
│  ├─ parserWorker.js          # Consumes queue jobs, runs extractors
│  └─ extractors/
│     ├─ phoneExtractor.js
│     ├─ linkExtractor.js
│     └─ handleExtractor.js
├─ services/
│  ├─ storageService.js        # Saves raw files to S3/Azure Blob
│  ├─ indicatorService.js      # Upsert + notify blocklist entries
│  └─ queueService.js          # BullMQ wrapper
└─ models/
   ├─ HoneypotUpload.js
   └─ ScamIndicator.js
```

## Pseudocode: Parser Worker
```js
import { phoneExtractor, linkExtractor, handleExtractor } from './extractors/index.js';
import { IndicatorService } from '../services/indicatorService.js';

export const handleUploadJob = async ({ uploadId, textBlob }) => {
  const indicators = new Map();

  phoneExtractor(textBlob).forEach((indicator) => indicators.set(indicator.value, indicator));
  linkExtractor(textBlob).forEach((indicator) => indicators.set(indicator.value, indicator));
  handleExtractor(textBlob).forEach((indicator) => indicators.set(indicator.value, indicator));

  await IndicatorService.bulkUpsert([...indicators.values()].map((indicator) => ({
    indicator: indicator.value,
    indicatorType: indicator.type,
    firstSeen: indicator.firstSeen,
    lastSeen: new Date(),
    sourceUploadId: uploadId
  })));
};
```

## Blocklist API Contract
- `GET /honeypot/indicators?type=phone&status=active`
- `POST /honeypot/indicators/disable` to allow moderators to mark false positives.
- Webhooks: `POST /internal/events/scambot` fired whenever `sightings >= threshold` to feed dashboards.

## Security Controls
- Files scanned with ClamAV before parsing.
- Upload endpoint guarded by reCAPTCHA + authenticated session.
- Queue jobs signed with HMAC to prevent forged payloads.
- Personally identifiable conversations are encrypted at rest and automatically purged after 30 days.

This design keeps ingestion isolated (ScamBot service) while the main API simply reads from `scam_blocklist` to power lookup risk scores and real-time alerts.
