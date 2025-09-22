import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc, query, where, getDocs, onSnapshot, Firestore } from 'firebase/firestore';
import { Firebase } from './firebase';

export type ClientEntity = {
  id?: string;
  ownerId: string;
  type?: string;
  name: string;
  email?: string;
  phone?: string;
  addressLine?: string;
  postalCode?: string;
  city?: string;
  notes?: string;
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

const COLLECTION = 'clients';

export const clientsRepository = {
  async create(input: Omit<ClientEntity, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>) {
    const auth = Firebase.auth();
    const ownerId = auth.currentUser?.uid;
    assertRequired(ownerId, 'Not authenticated');
    assertRequired(input.name, 'Client name is required');

    const payload = {
      ...input,
      ownerId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    } as const;

    const ref = await addDoc(collection(getDb(), COLLECTION), payload);
    const snap = await getDoc(ref);
    return { id: ref.id, ...(snap.data() as Omit<ClientEntity, 'id'>) };
  },

  async update(id: string, input: Partial<Omit<ClientEntity, 'id' | 'ownerId' | 'createdAt'>>) {
    assertRequired(id, 'Client id is required');
    const auth = Firebase.auth();
    const ownerId = auth.currentUser?.uid;
    assertRequired(ownerId, 'Not authenticated');

    const ref = doc(getDb(), COLLECTION, id);
    await updateDoc(ref, { ...input, updatedAt: serverTimestamp() });
    const snap = await getDoc(ref);
    return { id, ...(snap.data() as Omit<ClientEntity, 'id'>) };
  },

  async getById(id: string) {
    assertRequired(id, 'Client id is required');
    const ref = doc(getDb(), COLLECTION, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<ClientEntity, 'id'>) } as ClientEntity;
  },

  async listByOwnerId(ownerId?: string) {
    const auth = Firebase.auth();
    const resolvedOwnerId = ownerId ?? auth.currentUser?.uid ?? '';
    assertRequired(resolvedOwnerId, 'ownerId is required');
    const q = query(collection(getDb(), COLLECTION), where('ownerId', '==', resolvedOwnerId));
    const snaps = await getDocs(q);
    return snaps.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ClientEntity, 'id'>) } as ClientEntity));
  },

  observeById(id: string, cb: (client: ClientEntity | null) => void) {
    assertRequired(id, 'Client id is required');
    const ref = doc(getDb(), COLLECTION, id);
    return onSnapshot(ref, (snap) => {
      if (!snap.exists()) return cb(null);
      cb({ id: snap.id, ...(snap.data() as Omit<ClientEntity, 'id'>) } as ClientEntity);
    });
  },

  observeListByOwnerId(ownerId: string | undefined, cb: (clients: ClientEntity[]) => void) {
    const auth = Firebase.auth();
    const resolvedOwnerId = ownerId ?? auth.currentUser?.uid ?? '';
    assertRequired(resolvedOwnerId, 'ownerId is required');
    const q = query(collection(getDb(), COLLECTION), where('ownerId', '==', resolvedOwnerId));
    return onSnapshot(q, (snaps) => {
      cb(snaps.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ClientEntity, 'id'>) } as ClientEntity)));
    });
  },
};


