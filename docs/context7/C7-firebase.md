# C7 Note: Firebase Playbook (Auth + Firestore)

- Library/Topic: Firebase JS SDK (Auth, Firestore)
- Version(s): SDK v9 modular | RN/Expo
- Date: 2025-09-20
- Source links:
  - https://firebase.google.com/docs/reference/js/auth
  - https://firebase.google.com/docs/reference/js/firestore

## Purpose
Single source of truth for our Firebase usage: auth, data shapes, indexes, rules, and common patterns.

## Collections & Document Shapes
- clients
  - id (string, doc id)
  - ownerId (string, auth uid)
  - type ("Zakelijk" | "Particulier")
  - name (string)
  - email (string)
  - phone (string)
  - addressLine (string)
  - postalCode (string)
  - city (string)
  - notes (string)
  - createdAt (Firestore Timestamp)
  - updatedAt (Firestore Timestamp)

- tasks
  - id (string, doc id)
  - ownerId (string, auth uid)
  - clientId (string, ref id to clients)
  - date (string, YYYY-MM-DD)
  - startAt (string, HH:mm)
  - endAt (string, HH:mm)
  - type ("Onderhoud" | "Project" | "Klantenbezoek" | "Vrije Taak")
  - description (string)
  - createdAt (Firestore Timestamp)
  - updatedAt (Firestore Timestamp)

Notes
- Store planning fields (`date`, `startAt`, `endAt`) as strings for easy UI formatting; use dayjs for parsing/validation. Timestamps used for audit fields.

## Indexes
- tasks: (ownerId, date)
- tasks: (ownerId, clientId, startAt)
- clients: (ownerId, name)

## Security Rules (conceptual)
- Read/write only when `request.auth.uid == resource.data.ownerId` (or new doc `ownerId` == `request.auth.uid`)
- Validate allowed `type`/`task.type` enums
- Restrict `createdAt` to `request.time` on create; `updatedAt` on update

## Auth Patterns
- Email/password: `signInWithEmailAndPassword(auth, email, password)`
- Session: `onAuthStateChanged(auth, callback)`
- Sign out: `signOut(auth)`

## Firestore Patterns (Modular)
- Get collection: `collection(db, 'clients')`
- Doc refs: `doc(db, 'clients', clientId)`
- Create with server time: `setDoc(docRef, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })`
- Update: `updateDoc(docRef, { ...changes, updatedAt: serverTimestamp() })`
- Query day tasks: `query(collection(db, 'tasks'), where('ownerId','==',uid), where('date','==',yyyyMmDd))`
- Listen realtime (optional): `onSnapshot(queryRef, cb)`
- Offline persistence: enable Firestore persistence in app bootstrap when needed.

## Data Validation (Client-side)
- Forms: React Hook Form + Zod
- Date/time: dayjs (nl-NL, 24h); ensure `endAt > startAt` and same day

## Decision Notes (Repo-specific)
- Keep enum values aligned with UI tag colors (F-011 mapping)
- Use string date/time for calendar layout; convert to Date objects only in UI logic
- Keep references shallow (store `clientId`, fetch as needed)

## Last Verified
- Verified against MASTER_PRD Data Model and indexes. If SDK/APIs change or rules/indexes evolve, re-verify and update this note.
