import React from 'react';
import { NewClientScreen } from '@/ui/screens';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNavigation, useFocusEffect } from 'expo-router';
import { Platform, View, Pressable, StyleSheet, Animated, Easing, BackHandler } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { theme } from '@/ui/tokens';

export default function NewClientRoute() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams<{ from?: string }>();

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

  // Bottom sheet across platforms
  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['96%'], []);

  const handleClose = React.useCallback(() => {
    router.back();
  }, [router]);

  React.useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      const isOpen = sheetRef.current != null;
      if (isOpen) {
        sheetRef.current?.close();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableHandlePanningGesture
        enableContentPanningGesture
        keyboardBehavior="fillParent"
        android_keyboardInputMode="adjustResize"
        onClose={handleClose}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />
        )}
        handleIndicatorStyle={{ backgroundColor: theme.colors.gray[600], width: 36, height: 4, alignSelf: 'center' }}
        backgroundStyle={{ backgroundColor: theme.colors.gray[900] }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <NewClientScreen hideBackArrow from={typeof params.from === 'string' ? params.from : undefined} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({});


