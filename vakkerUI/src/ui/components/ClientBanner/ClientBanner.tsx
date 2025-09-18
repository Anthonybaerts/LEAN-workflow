import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Briefcase } from '../../icons';
import { theme } from '../../tokens';

type Props = {
  name: string;
  type?: string;
  date?: string;
  tagLabel?: string;
  tagColor?: 'green' | 'blue' | 'gray';
};

export function ClientBanner({
  name,
  type = '',
  date,
  tagLabel,
  tagColor = 'green',
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Briefcase width={32} height={32} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{type}</Text>
          {date ? <Text style={styles.meta}> • {date}</Text> : null}
        </View>
      </View>
      {tagLabel ? (
        <View style={styles.tag}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  tagColor === 'green'
                    ? theme.colors.success.main
                    : theme.colors.primary.main,
              },
            ]}
          />
          <Text
            style={[
              styles.tagText,
              {
                color:
                  tagColor === 'green'
                    ? theme.colors.success.main
                    : theme.colors.primary.main,
              },
            ]}
          >
            {tagLabel}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.gray[900],
    borderWidth: 1,
    borderColor: theme.colors.gray[700],
  } as any,
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary['20'],
  },
  content: { flex: 1 },
  name: { color: theme.colors.white, fontSize: 18, fontWeight: '700' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  meta: { color: theme.colors.gray[200], fontSize: 14 },
  tag: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 9999 },
  tagText: { fontSize: 12, fontWeight: '500' },
});
