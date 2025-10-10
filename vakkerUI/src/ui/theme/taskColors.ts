import { theme } from '@/ui/tokens';

export type WorkType = 'maintenance' | 'project' | 'client_visit' | 'free_task';
export type TaskColorVariant = 'blue' | 'yellow' | 'green' | 'gray';

export const workTypeToVariant: Record<WorkType, TaskColorVariant> = {
  maintenance: 'blue',
  project: 'yellow',
  client_visit: 'green',
  free_task: 'gray',
};

export const variantToToken: Record<
  TaskColorVariant,
  { text: string; bg: string; border: string }
> = {
  blue: {
    text: theme.colors.primary.main,
    bg: theme.colors.primary['20'],
    border: theme.colors.primary.main,
  },
  yellow: {
    text: theme.colors.warning.main,
    // F-012 may add warning['20']; keep safe RGBA for now
    bg: (theme.colors as any)?.warning?.['20'] ?? 'rgba(255, 215, 0, 0.2)',
    border: theme.colors.warning.main,
  },
  green: {
    text: theme.colors.success.main,
    bg: (theme.colors as any)?.success?.['20'] ?? 'rgba(76, 175, 80, 0.2)',
    border: theme.colors.success.main,
  },
  gray: {
    text: theme.colors.gray['500'],
    // F-012 may add gray['20']; keep safe RGBA for now
    bg: (theme.colors as any)?.gray?.['20'] ?? 'rgba(156, 163, 175, 0.2)',
    border: theme.colors.gray['500'],
  },
};

/**
 * Normalize any incoming string to a supported TaskColorVariant.
 * Accepts both legacy domain values and current variants, defaults to 'blue'.
 */
export function resolveVariant(input: string | undefined): TaskColorVariant {
  if (!input) return 'blue';
  const lowered = String(input).toLowerCase();
  // Direct variant pass-through
  if (lowered === 'blue' || lowered === 'yellow' || lowered === 'green' || lowered === 'gray') {
    return lowered as TaskColorVariant;
  }
  // Map legacy domain values to variants
  const domainToVariant: Record<string, TaskColorVariant> = {
    maintenance: 'blue',
    project: 'yellow',
    client_visit: 'green',
    free_task: 'gray',
    klantenbezoek: 'green',
    onderhoud: 'blue',
    projectwerk: 'yellow',
    vrije_taak: 'gray',
  };
  return domainToVariant[lowered] ?? 'blue';
}


