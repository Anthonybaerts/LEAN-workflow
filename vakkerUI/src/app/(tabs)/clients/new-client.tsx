import React from 'react';
import { NewClientScreen } from '@/ui/screens';
import { useNavigation, useFocusEffect } from 'expo-router';
import { theme } from '@/ui/tokens';

export default function NewClientRoute() {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.getParent?.();
      parent?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => {
        parent?.setOptions({
          tabBarStyle: {
            backgroundColor: theme.colors.gray[900],
            borderTopColor: theme.colors.gray[700],
          },
        });
      };
    }, [navigation])
  );

  return <NewClientScreen />;
}


