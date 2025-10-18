import React from 'react';
import { Platform, ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';
import { NewClientScreen } from '@/ui/screens';
import { Close } from '@/ui/icons';
import { theme } from '@/ui/tokens';

export const options = { presentation: 'modal' } as const;

export default function NewTaskNewClientModalRoute() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: theme.colors.gray[900] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 16, paddingBottom: 8 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Sluiten"
          style={{ padding: 8 }}
        >
          <Close width={24} height={24} color={theme.colors.gray[100]} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 0 }}>
          <NewClientScreen from="new-task" hideBackArrow />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


