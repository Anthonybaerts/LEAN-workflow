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


