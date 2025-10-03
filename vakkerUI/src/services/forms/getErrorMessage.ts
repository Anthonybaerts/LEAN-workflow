import type { FieldErrors } from 'react-hook-form';
import { nlMessages } from '../validation/messages';

export function getErrorMessage(errors: FieldErrors, name: string): string | undefined {
  const err = name.split('.').reduce<any>((acc, key) => (acc ? acc[key] : undefined), errors);
  if (!err) return undefined;
  if (typeof err.message === 'string' && err.message.length > 0) return err.message;
  // fallback by type if message not provided
  switch (err.type) {
    case 'required':
      return nlMessages.required;
    default:
      return undefined;
  }
}

// Remove keys with undefined values to satisfy Firestore data rules
export function removeUndefined<T extends Record<string, any>>(obj: T): T {
  const result: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    const value = (obj as any)[key];
    if (value !== undefined) result[key] = value;
  }
  return result as T;
}


