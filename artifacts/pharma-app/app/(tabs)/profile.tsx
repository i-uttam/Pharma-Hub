import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

type MenuItem = {
  icon: string;
  iconLib?: 'ionicons' | 'mci';
  label: string;
  value?: string;
  chevron?: boolean;
  danger?: boolean;
  toggle?: boolean;
};

const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Business Profile',
    items: [
      { icon: 'business-outline', label: 'Business Name', value: 'City Pharma Distributors', chevron: true },
      { icon: 'receipt-outline', label: 'GST Number', value: '27AADCC1234M1Z5', chevron: true },
      { icon: 'document-text-outline', label: 'Drug License', value: 'MH-MUM-123456', chevron: true },
      { icon: 'location-outline', label: 'Business Address', value: 'Mumbai, Maharashtra', chevron: true },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', label: 'Owner Name', value: 'Rahul Sharma', chevron: true },
      { icon: 'call-outline', label: 'Mobile', value: '+91 98765 43210', chevron: true },
      { icon: 'mail-outline', label: 'Email', value: 'rahul@citypharma.in', chevron: true },
      { icon: 'lock-closed-outline', label: 'Change Password', chevron: true },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'language-outline', label: 'Language', value: 'English', chevron: true },
      { icon: 'moon-outline', label: 'Dark Mode', toggle: true },
      { icon: 'notifications-outline', label: 'Notifications', chevron: true },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'chatbubble-outline', label: 'Live Chat', chevron: true },
      { icon: 'help-circle-outline', label: 'FAQ', chevron: true },
      { icon: 'ticket-outline', iconLib: 'mci', label: 'Raise a Ticket', chevron: true },
    ],
  },
];

function MenuRow({ item }: { item: MenuItem }) {
  const colors = useColors();
  return (
    <Pressable
      style={[styles.menuRow, { borderBottomColor: colors.border }]}
      onPress={() => Haptics.selectionAsync()}
    >
      <View style={[styles.menuIconWrap, { backgroundColor: item.danger ? '#FEECEB' : colors.muted }]}>
        {item.iconLib === 'mci'
          ? <MaterialCommunityIcons name={item.icon as any} size={18} color={item.danger ? '#EA4335' : colors.primary} />
          : <Ionicons name={item.icon as any} size={18} color={item.danger ? '#EA4335' : colors.primary} />
        }
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.menuLabel, { color: item.danger ? '#EA4335' : colors.foreground }]}>{item.label}</Text>
        {item.value && <Text style={[styles.menuValue, { color: colors.mutedForeground }]} numberOfLines={1}>{item.value}</Text>}
      </View>
      {item.toggle ? (
        <Switch
          value={false}
          onValueChange={() => Haptics.selectionAsync()}
          trackColor={{ false: '#E2E8F0', true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      ) : item.chevron ? (
        <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
      ) : null}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: bottomPad + 80 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile header */}
      <View style={[styles.profileHeader, { paddingTop: topPad + 16, backgroundColor: colors.primary }]}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>CP</Text>
          </View>
          <Pressable style={[styles.editBadge, { backgroundColor: colors.accent }]}>
            <Ionicons name="pencil" size={12} color="#FFFFFF" />
          </Pressable>
        </View>
        <Text style={styles.profileName}>City Pharma Distributors</Text>
        <Text style={styles.profileType}>Wholesale Distributor</Text>
        <View style={styles.profileStats}>
          {[
            { label: 'Orders', value: '284' },
            { label: 'This Month', value: '₹1.2L' },
            { label: 'Since', value: '2021' },
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

      {/* Menu sections */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, gap: 16 }}>
        {MENU_SECTIONS.map((section) => (
          <View key={section.title}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>{section.title}</Text>
            <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {section.items.map((item, i) => (
                <MenuRow key={item.label} item={item} />
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <Pressable
          style={[styles.logoutBtn, { borderColor: '#EA4335' }]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.replace('/login');
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="#EA4335" />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>

        <Text style={[styles.version, { color: colors.mutedForeground }]}>
          MediWholesale v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    gap: 6,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  profileType: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Inter_400Regular',
  },
  profileStats: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 0,
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    fontFamily: 'Inter_400Regular',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  menuValue: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EA4335',
    fontFamily: 'Inter_600SemiBold',
  },
  version: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
});
