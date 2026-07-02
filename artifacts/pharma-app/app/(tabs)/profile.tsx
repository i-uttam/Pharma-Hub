import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrdersContext';
import { useColors } from '@/hooks/useColors';

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { profile, logout, updateProfile } = useAuth();
  const { orders } = useOrders();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const totalSpend = orders.filter((o) => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0);

  async function handleSave() {
    await updateProfile(form);
    setEditing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  function handleLogout() {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  }

  function Field({ label, field, keyboardType = 'default' }: {
    label: string;
    field: keyof typeof form;
    keyboardType?: 'default' | 'email-address' | 'phone-pad';
  }) {
    return (
      <View style={[styles.field, { borderBottomColor: colors.border }]}>
        <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>{label}</Text>
        {editing ? (
          <TextInput
            style={[styles.fieldInput, { color: colors.foreground }]}
            value={String(form[field])}
            onChangeText={(v) => setForm((p) => ({ ...p, [field]: v }))}
            keyboardType={keyboardType}
            placeholderTextColor={colors.mutedForeground}
          />
        ) : (
          <Text style={[styles.fieldValue, { color: colors.foreground }]}>
            {String(profile[field]) || '—'}
          </Text>
        )}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: bottomPad + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile header */}
        <View style={[styles.profileHeader, { paddingTop: topPad + 16, backgroundColor: colors.primary }]}>
          <View style={styles.headerRow}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profile.businessName.slice(0, 2).toUpperCase()}
                </Text>
              </View>
            </View>
            <Pressable
              style={[styles.editToggle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              onPress={() => { editing ? handleSave() : setEditing(true); Haptics.selectionAsync(); }}
            >
              <Ionicons name={editing ? 'checkmark' : 'pencil'} size={16} color="#FFF" />
              <Text style={styles.editToggleText}>{editing ? 'Save' : 'Edit'}</Text>
            </Pressable>
          </View>
          <Text style={styles.profileName}>{profile.businessName}</Text>
          <Text style={styles.profileType}>{profile.drugLicense}</Text>

          {/* Stats */}
          <View style={styles.profileStats}>
            {[
              { label: 'Orders', value: orders.length.toString() },
              { label: 'Completed', value: deliveredOrders.toString() },
              { label: 'Total Spend', value: `₹${(totalSpend / 1000).toFixed(1)}K` },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <View style={styles.statDivider} />}
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 20, gap: 20 }}>
          {/* Business Profile */}
          <SectionCard title="Business Profile" colors={colors}>
            <Field label="Business Name" field="businessName" />
            <Field label="Owner Name" field="ownerName" />
            <Field label="GST Number" field="gstNumber" />
            <Field label="Drug License" field="drugLicense" />
          </SectionCard>

          {/* Contact */}
          <SectionCard title="Contact Details" colors={colors}>
            <Field label="Mobile" field="phone" keyboardType="phone-pad" />
            <Field label="Email" field="email" keyboardType="email-address" />
          </SectionCard>

          {/* Address */}
          <SectionCard title="Business Address" colors={colors}>
            <Field label="Address" field="address" />
            <Field label="City" field="city" />
            <Field label="State" field="state" />
            <Field label="Pincode" field="pincode" />
          </SectionCard>

          {/* Preferences */}
          <SectionCard title="Preferences" colors={colors}>
            <View style={[styles.field, { borderBottomColor: 'transparent' }]}>
              <View>
                <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Language</Text>
                <Text style={[styles.fieldValue, { color: colors.foreground }]}>English</Text>
              </View>
              <Switch
                value={false}
                onValueChange={() => Haptics.selectionAsync()}
                trackColor={{ false: '#E2E8F0', true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </SectionCard>

          {/* Notifications */}
          <SectionCard title="Notifications" colors={colors}>
            <Pressable
              style={[styles.supportRow, { borderBottomColor: 'transparent' }]}
              onPress={() => router.push('/notifications')}
            >
              <View style={[styles.supportIcon, { backgroundColor: colors.muted }]}>
                <Ionicons name="notifications-outline" size={18} color={colors.primary} />
              </View>
              <Text style={[styles.supportLabel, { color: colors.foreground }]}>Notifications</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
            </Pressable>
          </SectionCard>

          {/* Support */}
          <SectionCard title="Support" colors={colors}>
            {[
              { icon: 'chatbubble-outline', label: 'Live Chat', onPress: () => Haptics.selectionAsync() },
              { icon: 'call-outline', label: 'Call Support', onPress: () => Haptics.selectionAsync() },
              { icon: 'help-circle-outline', label: 'FAQ', onPress: () => Haptics.selectionAsync() },
            ].map((item, i, arr) => (
              <Pressable
                key={item.label}
                style={[styles.supportRow, { borderBottomColor: i < arr.length - 1 ? colors.border : 'transparent' }]}
                onPress={item.onPress}
              >
                <View style={[styles.supportIcon, { backgroundColor: colors.muted }]}>
                  <Ionicons name={item.icon as any} size={18} color={colors.primary} />
                </View>
                <Text style={[styles.supportLabel, { color: colors.foreground }]}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
              </Pressable>
            ))}
          </SectionCard>

          {/* Legal */}
          <SectionCard title="Legal" colors={colors}>
            {[
              { icon: 'document-text-outline', label: 'Terms of Service', route: '/terms' },
              { icon: 'shield-outline', label: 'Privacy Policy', route: '/privacy' },
              { icon: 'information-circle-outline', label: 'About MediWholesale', route: '/about' },
            ].map((item, i, arr) => (
              <Pressable
                key={item.label}
                style={[styles.supportRow, { borderBottomColor: i < arr.length - 1 ? colors.border : 'transparent' }]}
                onPress={() => router.push(item.route as any)}
              >
                <View style={[styles.supportIcon, { backgroundColor: colors.muted }]}>
                  <Ionicons name={item.icon as any} size={18} color={colors.mutedForeground} />
                </View>
                <Text style={[styles.supportLabel, { color: colors.foreground }]}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
              </Pressable>
            ))}
          </SectionCard>

          {/* Logout */}
          <Pressable style={[styles.logoutBtn, { borderColor: colors.destructive }]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={colors.destructive} />
            <Text style={[styles.logoutText, { color: colors.destructive }]}>Log Out</Text>
          </Pressable>

          <Text style={[styles.version, { color: colors.mutedForeground }]}>MediWholesale v1.0.0</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function SectionCard({ title, colors, children }: { title: string; colors: any; children: React.ReactNode }) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>{title.toUpperCase()}</Text>
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: { paddingHorizontal: 20, paddingBottom: 24, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  avatarWrap: {},
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)' },
  avatarText: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', fontFamily: 'Inter_700Bold' },
  editToggle: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  editToggleText: { color: '#FFF', fontSize: 14, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  profileName: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', fontFamily: 'Inter_700Bold' },
  profileType: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter_400Regular', marginTop: 2 },
  profileStats: { flexDirection: 'row', marginTop: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, paddingVertical: 14, paddingHorizontal: 20, justifyContent: 'space-around' },
  statItem: { alignItems: 'center', gap: 2 },
  statValue: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter_400Regular' },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginVertical: 4 },
  sectionTitle: { fontSize: 11, fontWeight: '600', fontFamily: 'Inter_600SemiBold', letterSpacing: 0.8 },
  sectionCard: { borderWidth: 1, borderRadius: 16, overflow: 'hidden' },
  field: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, gap: 12 },
  fieldLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', marginBottom: 2 },
  fieldValue: { fontSize: 14, fontWeight: '500', fontFamily: 'Inter_500Medium' },
  fieldInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium', textAlign: 'right' },
  supportRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, gap: 12 },
  supportIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  supportLabel: { flex: 1, fontSize: 14, fontWeight: '500', fontFamily: 'Inter_500Medium' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16, borderRadius: 16, borderWidth: 1.5 },
  logoutText: { fontSize: 15, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  version: { fontSize: 12, textAlign: 'center', fontFamily: 'Inter_400Regular' },
});
