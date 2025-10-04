import React from 'react';
import { useLocalSearchParams, useNavigation, useFocusEffect } from 'expo-router';
import { ClientInfoScreen } from '@/ui/screens/ClientInfoScreen';
import { theme } from '@/ui/tokens';

export default function ClientInfoById() {
  const params = useLocalSearchParams<{ clientId?: string }>();
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

  return <ClientInfoScreen clientId={params.clientId} />;
}


