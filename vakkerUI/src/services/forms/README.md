# Forms & Validation Helpers

This folder hosts React Hook Form helpers that integrate with Zod schemas.

- useZodForm(schema): returns RHF methods with zodResolver wired
- getErrorMessage: converts Zod issues to Dutch strings

Usage (example):

```tsx
import { useZodForm } from '@/services/forms/useZodForm';
import { getErrorMessage } from '@/services/forms/getErrorMessage';
import { clientSchema } from '@/services/validation/clientSchema';

const form = useZodForm(clientSchema, { defaultValues: { name: '', type: 'Zakelijk' } });
const nameError = getErrorMessage(form.formState.errors, 'name');
// Disable submit until valid: !form.isValid
```


