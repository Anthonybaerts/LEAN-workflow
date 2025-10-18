import React from 'react';
import { NewClientScreen } from '@/ui/screens';

export const options = { presentation: 'fullScreenModal', freezeOnBlur: true, animation: 'slide_from_bottom' } as const;

export default function NewTaskNewClientModalRoute() {
  return <NewClientScreen from="new-task" />;
}


