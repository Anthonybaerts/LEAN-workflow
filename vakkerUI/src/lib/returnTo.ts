// Deprecated helper (legacy routing). File scheduled for removal.
export type RouteRef = { pathname: string; params: Record<string, string> };

export function normalizeParams(p?: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  if (!p) return out;
  for (const [k, v] of Object.entries(p)) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'string') {
      out[k] = v;
      continue;
    }
    try {
      out[k] = JSON.stringify(v);
    } catch {
      out[k] = String(v);
    }
  }
  return out;
}

export function buildReturnTo(pathname: string, params: Record<string, unknown>): string {
  const payload: RouteRef = { pathname, params: normalizeParams(params) };
  const json = JSON.stringify(payload);
  // base64 encode; handle environments without btoa
  try {
    return typeof btoa === 'function' ? btoa(json) : Buffer.from(json, 'utf-8').toString('base64');
  } catch {
    return Buffer.from(json, 'utf-8').toString('base64');
  }
}

export function tryDecodeReturnToB64(b64?: string): RouteRef | null {
  if (!b64 || typeof b64 !== 'string') return null;
  try {
    const json = typeof atob === 'function' ? atob(b64) : Buffer.from(b64, 'base64').toString('utf-8');
    const parsed = JSON.parse(json);
    const pathname = typeof parsed?.pathname === 'string' ? parsed.pathname : '';
    const params = normalizeParams(parsed?.params ?? {});
    if (!pathname) return null;
    return { pathname, params };
  } catch {
    return null;
  }
}

export function isSameRoute(a: RouteRef, b: RouteRef): boolean {
  if (a.pathname !== b.pathname) return false;
  const aKeys = Object.keys(a.params);
  const bKeys = Object.keys(b.params);
  if (aKeys.length !== bKeys.length) return false;
  for (const k of aKeys) {
    if (a.params[k] !== b.params[k]) return false;
  }
  return true;
}


