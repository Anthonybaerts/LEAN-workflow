# Context7 Note — RHF + Zod Integration

Notes:
- Use `zodResolver(schema)` with `useForm` for schema validation.
- For React Native, use `Controller` to bind `TextInput` with `onChangeText`.
- Prefer optional fields as `z.string().optional().or(z.literal(''))` when UI submits empty strings.
- Enum required error for `z.enum([...])` does not accept `required_error` param in current Zod here; set required via surrounding `.min(1)` or fallback copy.

References captured from RHF docs.


