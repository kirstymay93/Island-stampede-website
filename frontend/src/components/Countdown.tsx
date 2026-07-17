import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, font, spacing, radius, EVENT_START } from '../theme';

function diff(target: Date) {
  const total = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(total / 86400000);
  const hours = Math.floor((total % 86400000) / 3600000);
  const mins = Math.floor((total % 3600000) / 60000);
  const secs = Math.floor((total % 60000) / 1000);
  return { days, hours, mins, secs };
}

function Block({ value, label, testID }: { value: number; label: string; testID: string }) {
  const v = value < 10 ? `0${value}` : `${value}`;
  return (
    <View style={styles.block} testID={testID}>
      <Text style={styles.value}>{v}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default function Countdown() {
  const [t, setT] = useState(() => diff(EVENT_START));
  useEffect(() => {
    const id = setInterval(() => setT(diff(EVENT_START)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.wrap} testID="countdown-section">
      <View style={styles.tagRow}>
        <View style={styles.dot} />
        <Text style={styles.tag}>COUNTDOWN TO KICKOFF</Text>
      </View>
      <View style={styles.row}>
        <Block value={t.days} label="DAYS" testID="countdown-days" />
        <Text style={styles.sep}>:</Text>
        <Block value={t.hours} label="HRS" testID="countdown-hours" />
        <Text style={styles.sep}>:</Text>
        <Block value={t.mins} label="MIN" testID="countdown-mins" />
        <Text style={styles.sep}>:</Text>
        <Block value={t.secs} label="SEC" testID="countdown-secs" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.lg, paddingVertical: spacing.xl, backgroundColor: colors.surface },
  tagRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg, gap: spacing.sm },
  dot: { width: 8, height: 8, borderRadius: radius.pill, backgroundColor: colors.brand },
  tag: { color: colors.onSurfaceTertiary, fontFamily: font.bold, fontSize: 12, letterSpacing: 2 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
  block: {
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    minWidth: 72,
    alignItems: 'center',
  },
  value: { color: colors.onSurface, fontFamily: font.display, fontSize: 44, lineHeight: 46 },
  label: { color: colors.onBrandTertiary, fontFamily: font.bold, fontSize: 10, letterSpacing: 2, marginTop: 2 },
  sep: { color: colors.brand, fontFamily: font.display, fontSize: 36, marginHorizontal: 2 },
});
