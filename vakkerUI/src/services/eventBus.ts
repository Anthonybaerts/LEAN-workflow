type Listener<T = any> = (payload: T) => void;

const listeners: Record<string, Set<Listener>> = {};

export const eventBus = {
  on<T = any>(event: string, listener: Listener<T>) {
    if (!listeners[event]) listeners[event] = new Set();
    listeners[event].add(listener as Listener);
    return () => {
      listeners[event]?.delete(listener as Listener);
    };
  },
  off<T = any>(event: string, listener: Listener<T>) {
    listeners[event]?.delete(listener as Listener);
  },
  emit<T = any>(event: string, payload: T) {
    const set = listeners[event];
    if (!set) return;
    set.forEach((l) => {
      try {
        l(payload);
      } catch {}
    });
  },
};


