# Firestore Rules and Indexes — F-006

This note captures the planned Firestore security rules and composite indexes for feature F-006.

## Security Rules (plan)

Enforce that users can only read/write documents they own by matching `request.auth.uid` to `resource.data.ownerId` (for writes) and document `ownerId` (for reads).

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() {
      return request.auth != null && request.auth.uid != null;
    }
    function isOwner() {
      return isSignedIn() && request.auth.uid == resource.data.ownerId;
    }
    function isOwnerOnCreate() {
      return isSignedIn() && request.auth.uid == request.resource.data.ownerId;
    }

    // Clients collection
    match /clients/{clientId} {
      allow read: if isOwner();
      allow create: if isOwnerOnCreate();
      allow update, delete: if isOwner();
    }

    // Tasks collection
    match /tasks/{taskId} {
      allow read: if isOwner();
      allow create: if isOwnerOnCreate();
      allow update, delete: if isOwner();
    }
  }
}
```

Notes:
- Writes must set `ownerId` to the authenticated user id.
- Reads should be scoped by `ownerId` in queries to leverage indexes and rules.

## Composite Indexes (plan)

Define the following composite indexes to support planned queries:

- tasks: `ownerId` ASC, `date` ASC
- tasks: `ownerId` ASC, `clientId` ASC, `startAt` ASC
- clients: `ownerId` ASC, `name` ASC

You can create these via the Firebase Console (Firestore → Indexes → Composite) or `firestore.indexes.json` using the Admin SDK/CLI.


