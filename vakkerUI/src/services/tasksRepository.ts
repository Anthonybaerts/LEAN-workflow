import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc, query, where, getDocs, orderBy, onSnapshot, Firestore } from 'firebase/firestore';
import { Firebase } from './firebase';

export type TaskEntity = {
  id?: string;
  ownerId: string;
  clientId: string;
  date: string; // YYYY-MM-DD
  startAt?: string; // HH:mm
  endAt?: string; // HH:mm
  type?: string;
  description?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

function assertRequired(value: unknown, message: string): asserts value {
  if (value === undefined || value === null || value === '') {
    throw new Error(message);
  }
}

function getDb(): Firestore {
  return Firebase.firestore();
}

const COLLECTION = 'tasks';

export const tasksRepository = {
  async create(input: Omit<TaskEntity, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>) {
    const auth = Firebase.auth();
    const ownerId = auth.currentUser?.uid;
    assertRequired(ownerId, 'Not authenticated');
    assertRequired(input.clientId, 'clientId is required');
    assertRequired(input.date, 'date is required');

    const payload = {
      ...input,
      ownerId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    } as const;

    const ref = await addDoc(collection(getDb(), COLLECTION), payload);
    const snap = await getDoc(ref);
    return { id: ref.id, ...(snap.data() as Omit<TaskEntity, 'id'>) };
  },

  async update(id: string, input: Partial<Omit<TaskEntity, 'id' | 'ownerId' | 'createdAt'>>) {
    assertRequired(id, 'Task id is required');
    const auth = Firebase.auth();
    const ownerId = auth.currentUser?.uid;
    assertRequired(ownerId, 'Not authenticated');

    const ref = doc(getDb(), COLLECTION, id);
    await updateDoc(ref, { ...input, updatedAt: serverTimestamp() });
    const snap = await getDoc(ref);
    return { id, ...(snap.data() as Omit<TaskEntity, 'id'>) };
  },

  async getById(id: string) {
    assertRequired(id, 'Task id is required');
    const ref = doc(getDb(), COLLECTION, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<TaskEntity, 'id'>) } as TaskEntity;
  },

  async listByDate(date: string, ownerId?: string) {
    assertRequired(date, 'date is required');
    const auth = Firebase.auth();
    const resolvedOwnerId = ownerId ?? auth.currentUser?.uid ?? '';
    assertRequired(resolvedOwnerId, 'ownerId is required');
    const q = query(
      collection(getDb(), COLLECTION),
      where('ownerId', '==', resolvedOwnerId),
      where('date', '==', date),
      orderBy('startAt', 'asc')
    );
    const snaps = await getDocs(q);
    return snaps.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TaskEntity, 'id'>) } as TaskEntity));
  },

  async listByClientId(clientId: string, ownerId?: string) {
    assertRequired(clientId, 'clientId is required');
    const auth = Firebase.auth();
    const resolvedOwnerId = ownerId ?? auth.currentUser?.uid ?? '';
    assertRequired(resolvedOwnerId, 'ownerId is required');
    const q = query(
      collection(getDb(), COLLECTION),
      where('ownerId', '==', resolvedOwnerId),
      where('clientId', '==', clientId),
      orderBy('startAt', 'asc')
    );
    const snaps = await getDocs(q);
    return snaps.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TaskEntity, 'id'>) } as TaskEntity));
  },

  observeById(id: string, cb: (task: TaskEntity | null) => void) {
    assertRequired(id, 'Task id is required');
    const ref = doc(getDb(), COLLECTION, id);
    return onSnapshot(ref, (snap) => {
      if (!snap.exists()) return cb(null);
      cb({ id: snap.id, ...(snap.data() as Omit<TaskEntity, 'id'>) } as TaskEntity);
    });
  },

  observeListByDate(date: string, ownerId: string | undefined, cb: (tasks: TaskEntity[]) => void) {
    assertRequired(date, 'date is required');
    const auth = Firebase.auth();
    const resolvedOwnerId = ownerId ?? auth.currentUser?.uid ?? '';
    assertRequired(resolvedOwnerId, 'ownerId is required');
    const q = query(
      collection(getDb(), COLLECTION),
      where('ownerId', '==', resolvedOwnerId),
      where('date', '==', date),
      orderBy('startAt', 'asc')
    );
    return onSnapshot(q, (snaps) => {
      cb(snaps.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TaskEntity, 'id'>) } as TaskEntity)));
    });
  },

  observeListByClientId(clientId: string, ownerId: string | undefined, cb: (tasks: TaskEntity[]) => void) {
    assertRequired(clientId, 'clientId is required');
    const auth = Firebase.auth();
    const resolvedOwnerId = ownerId ?? auth.currentUser?.uid ?? '';
    assertRequired(resolvedOwnerId, 'ownerId is required');
    const q = query(
      collection(getDb(), COLLECTION),
      where('ownerId', '==', resolvedOwnerId),
      where('clientId', '==', clientId),
      orderBy('startAt', 'asc')
    );
    return onSnapshot(q, (snaps) => {
      cb(snaps.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TaskEntity, 'id'>) } as TaskEntity)));
    });
  },
};


