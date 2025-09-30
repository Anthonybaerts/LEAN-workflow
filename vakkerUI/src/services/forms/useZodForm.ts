import { useForm, UseFormProps, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema, TypeOf, output } from 'zod';

type AnyZod = ZodSchema<any>;

export type UseZodFormReturn<TSchema extends AnyZod> = ReturnType<
  typeof useForm<output<TSchema>>
> & {
  isValid: boolean;
};

export function useZodForm<TSchema extends AnyZod>(
  schema: TSchema,
  options?: Omit<UseFormProps<output<TSchema>>, 'resolver'>
): UseZodFormReturn<TSchema> {
  const form = useForm<output<TSchema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    ...options,
  });

  return Object.assign(form, { isValid: form.formState.isValid });
}


