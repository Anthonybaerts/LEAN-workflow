# F-006 Offline & Reconnect Validation

Goal: Validate that reads use cached data when offline and local writes sync on reconnect.

Prereqs:
- Logged-in user (F-001) so `ownerId` is set on writes.
- Build started with Firestore persistent cache enabled (already configured in `src/services/firebase.ts`).

Steps:
1) Warm cache
   - Create a client via `clientsRepository.create({ name: 'Test Client' })`.
   - Create a task via `tasksRepository.create({ clientId, date: '2025-09-22', startAt: '09:00' })`.
   - Observe lists using `observeListByOwnerId` and `observeListByDate` to see live data.

2) Go offline
   - Disable network on device/emulator (Airplane mode), or block network via devtools.
   - Expected: Observers continue to emit cached data; direct `get*` calls return cached results if available.

3) Queue writes while offline
   - Call `clientsRepository.update(...)` and `tasksRepository.update(...)`.
   - Expected: Writes are accepted locally (latency compensation). Observers show pending local changes; they will have `hasPendingWrites = true` in snapshot metadata (if inspected).

4) Reconnect
   - Re-enable network.
   - Expected: Pending writes upload automatically; observers reflect server state once confirmed.

Notes:
- Composite indexes required for queries are listed in `docs/F-006-firestore-rules-and-indexes.md`.
- Snapshot listeners are the recommended way to receive cached data while offline.


