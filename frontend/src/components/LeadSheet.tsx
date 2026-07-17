import React, { useState } from 'react';
import {
  Modal, View, Text, TextInput, Pressable, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, font, spacing, radius } from '../theme';

const API = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`;

type Props = { visible: boolean; type: 'ticket' | 'sponsor'; onClose: () => void };

export default function LeadSheet({ visible, type, onClose }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [extra, setExtra] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const isSponsor = type === 'sponsor';

  const reset = () => {
    setName(''); setEmail(''); setPhone(''); setExtra(''); setMessage('');
    setDone(false); setError(''); setLoading(false);
  };

  const close = () => { reset(); onClose(); };

  const submit = async () => {
    setError('');
    if (!name.trim() || !email.trim()) { setError('Name and email are required.'); return; }
    setLoading(true);
    try {
      const body: any = { name, email, phone, type, message };
      if (isSponsor) body.company = extra; else body.party_size = extra;
      const res = await fetch(`${API}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Request failed');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setDone(true);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropTouch} onPress={close} testID="lead-sheet-backdrop" />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.sheet} testID="lead-sheet">
            <View style={styles.handle} />
            <View style={styles.header}>
              <Text style={styles.title} testID="lead-sheet-title">
                {isSponsor ? 'BECOME A SPONSOR' : 'GET YOUR TICKETS'}
              </Text>
              <Pressable onPress={close} hitSlop={12} testID="lead-sheet-close">
                <Ionicons name="close" size={24} color={colors.onSurfaceTertiary} />
              </Pressable>
            </View>

            {done ? (
              <View style={styles.doneWrap} testID="lead-sheet-success">
                <Ionicons name="checkmark-circle" size={56} color={colors.success} />
                <Text style={styles.doneTitle}>YOU'RE ON THE LIST</Text>
                <Text style={styles.doneText}>
                  {isSponsor
                    ? 'Our partnerships team will be in touch with the sponsorship deck shortly.'
                    : "We'll send priority access and your secure checkout link before public release."}
                </Text>
                <Pressable style={styles.primaryBtn} onPress={close} testID="lead-sheet-done-button">
                  <Text style={styles.primaryBtnText}>DONE</Text>
                </Pressable>
              </View>
            ) : (
              <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <Text style={styles.subtitle}>
                  {isSponsor
                    ? 'Put your brand in front of thousands of fans. Register your interest.'
                    : 'Register now for priority access before tickets go on sale.'}
                </Text>

                <Field label="Full name" value={name} onChange={setName} placeholder="Your name" testID="lead-input-name" />
                <Field label="Email" value={email} onChange={setEmail} placeholder="you@email.com" keyboardType="email-address" testID="lead-input-email" />
                <Field label="Phone (optional)" value={phone} onChange={setPhone} placeholder="Phone number" keyboardType="phone-pad" testID="lead-input-phone" />
                <Field
                  label={isSponsor ? 'Company' : 'How many tickets?'}
                  value={extra}
                  onChange={setExtra}
                  placeholder={isSponsor ? 'Company name' : 'e.g. 4'}
                  testID="lead-input-extra"
                />
                <Field label="Message (optional)" value={message} onChange={setMessage} placeholder="Anything we should know?" multiline testID="lead-input-message" />

                {error ? <Text style={styles.error} testID="lead-error">{error}</Text> : null}

                <Pressable
                  style={[styles.primaryBtn, loading && { opacity: 0.6 }]}
                  onPress={submit}
                  disabled={loading}
                  testID="lead-submit-button"
                >
                  {loading ? <ActivityIndicator color="#fff" /> : (
                    <Text style={styles.primaryBtnText}>{isSponsor ? 'SUBMIT ENQUIRY' : 'REGISTER INTEREST'}</Text>
                  )}
                </Pressable>
                <View style={{ height: spacing.xl }} />
              </ScrollView>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

function Field({ label, value, onChange, placeholder, keyboardType, multiline, testID }: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMulti]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceTertiary}
        keyboardType={keyboardType || 'default'}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        multiline={multiline}
        testID={testID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  backdropTouch: { flex: 1 },
  sheet: {
    backgroundColor: colors.surfaceSecondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    maxHeight: '88%',
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  handle: { alignSelf: 'center', width: 44, height: 4, borderRadius: radius.pill, backgroundColor: colors.borderStrong, marginBottom: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  title: { color: colors.onSurface, fontFamily: font.display, fontSize: 30, letterSpacing: 1 },
  subtitle: { color: colors.onSurfaceTertiary, fontFamily: font.regular, fontSize: 14, marginBottom: spacing.lg },
  field: { marginBottom: spacing.md },
  fieldLabel: { color: colors.onSurfaceSecondary, fontFamily: font.semibold, fontSize: 12, marginBottom: spacing.xs, letterSpacing: 0.5 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.onSurface,
    fontFamily: font.regular,
    fontSize: 15,
  },
  inputMulti: { height: 80, textAlignVertical: 'top' },
  error: { color: colors.warning, fontFamily: font.semibold, fontSize: 13, marginBottom: spacing.sm },
  primaryBtn: {
    backgroundColor: colors.brand,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  primaryBtnText: { color: '#fff', fontFamily: font.extrabold, fontSize: 16, letterSpacing: 1 },
  doneWrap: { alignItems: 'center', paddingVertical: spacing.xl },
  doneTitle: { color: colors.onSurface, fontFamily: font.display, fontSize: 30, marginTop: spacing.md, letterSpacing: 1 },
  doneText: { color: colors.onSurfaceTertiary, fontFamily: font.regular, fontSize: 14, textAlign: 'center', marginTop: spacing.sm, marginBottom: spacing.xl, lineHeight: 20 },
});
