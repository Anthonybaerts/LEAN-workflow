# Theme Utilities

## Task Colors Mapping (F-011)

Single source of truth for task type → color variant and tokens.

- Work types: `maintenance`, `project`, `client_visit`, `free_task`
- Variants: `blue`, `yellow`, `green`, `gray`
- Use `workTypeToVariant` to convert domain work types to variants
- Use `resolveVariant(type)` when reading from persistence or user input
- Use `variantToToken[variant]` to get `{ text, bg, border }` colors

Example:

```ts
import { resolveVariant, variantToToken } from '@/ui/theme/taskColors';

const variant = resolveVariant(task.type);
const { text, bg, border } = variantToToken[variant];
```

Notes:
- Yellow and gray background "20" shades fall back to RGBA until tokens are added in F-012.
- Do not create local color maps in components; import from `taskColors` instead.
