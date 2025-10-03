---
docType: prd_shard
id: F-017
title: Offline Cache (RN)
deps: [F-001, F-006]
screens: []
anchors: []
---

## Summary
Cache last-loaded clients and tasks in AsyncStorage so users see recent data when briefly offline. Firestore remains source of truth; refresh cache on reconnect.

## Acceptance Criteria
- F-017-AC1: When offline at app launch, ClientsScreen/CalendarScreen show last cached data.
- F-017-AC2: When connectivity restores, UI refreshes from Firestore and cache updates.
- F-017-AC3: When no cache exists and offline, an EmptyState explains no offline data available.

## Notes
- Scope limited to read-through cache and cache invalidation on create/update.
- No conflict resolution; online data overwrites cache.


