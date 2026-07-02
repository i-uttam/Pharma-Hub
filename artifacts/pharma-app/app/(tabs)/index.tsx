import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const CATEGORIES = [
  { icon: 'pill', label: 'Tablets', color: '#4285F4' },
  { icon: 'pill-multiple', label: 'Capsules', color: '#0F9D58' },
  { icon: 'needle', label: 'Injections', color: '#EA4335' },
  { icon: 'bottle-tonic-plus', label: 'Syrups', color: '#FBBC05' },
  { icon: 'bandage', label: 'Surgical', color: '#9C27B0' },
  { icon: 'heart-pulse', label: 'Devices', color: '#F44336' },
  { icon: 'leaf', label: 'Ayurvedic', color: '#34A853' },
  { icon: 'dots-horizontal', label: 'More', color: '#607D8B' },
];

const FEATURED = [
  { name: 'Paracetamol 500mg', generic: 'Paracetamol', brand: 'Calpol', price: '₹42', mrp: '₹55', discount: '24%', stock: 'In Stock' },
  { name: 'Amoxicillin 250mg', generic: 'Amoxicillin', brand: 'Mox', price: '₹88', mrp: '₹115', discount: '23%', stock: 'In Stock' },
  { name: 'Metformin 500mg', generic: 'Metformin HCl', brand: 'Glycomet', price: '₹34', mrp: '₹48', discount: '29%', stock: 'Low Stock' },
];

function CategoryChip({ item }: { item: typeof CATEGORIES[0] }) {
  const colors = useColors();
  return (
    <Pressable style={styles.catChip}>
      <View style={[styles.catIcon, { backgroundColor: item.color + '18' }]}>
        <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color} />
      </View>
      <Text style={[styles.catLabel, { color: colors.foreground }]} numberOfLines={1}>{item.label}</Text>
    </Pressable>
  );
}

function ProductCard({ item }: { item: typeof FEATURED[0] }) {
  const colors = useColors();
  const isLow = item.stock === 'Low Stock';
  return (
    <View style={[styles.productCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.productImg, { backgroundColor: colors.muted }]}>
        <MaterialCommunityIcons name="pill" size={36} color={colors.primary} />
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: colors.foreground }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.productGeneric, { color: colors.mutedForeground }]} numberOfLines={1}>{item.generic} · {item.brand}</Text>
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
          <Text style={[styles.mrp, { color: colors.mutedForeground }]}>{item.mrp}</Text>
          <View style={[styles.discBadge, { backgroundColor: colors.successLight ?? '#E6F4ED' }]}>
            <Text style={[styles.discText, { color: colors.primary }]}>{item.discount} off</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={[styles.stockBadge, { backgroundColor: isLow ? '#FFF8E1' : '#E6F4ED' }]}>
            <Text style={[styles.stockText, { color: isLow ? '#F57F17' : colors.primary }]}>{item.stock}</Text>
          </View>
          <Pressable style={[styles.addBtn, { backgroundColor: colors.primary }]}>
            <Ionicons name="add" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 16, backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.businessName}>City Pharma Distributors</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
              <View style={styles.notifDot} />
            </Pressable>
            <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
              <Text style={styles.avatarText}>CP</Text>
            </View>
          </View>
        </View>

        {/* Search bar */}
        <Pressable style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#64748B" />
          <Text style={styles.searchPlaceholder}>Search medicines, brands…</Text>
          <Ionicons name="barcode-outline" size={20} color="#64748B" />
        </Pressable>
      </View>

      {/* Offer banner */}
      <View style={[styles.banner, { backgroundColor: '#1a6e3f' }]}>
        <View>
          <Text style={styles.bannerTitle}>Flash Sale — Up to 35% off</Text>
          <Text style={styles.bannerSub}>On bulk orders above ₹5,000</Text>
        </View>
        <Pressable style={styles.bannerBtn}>
          <Text style={[styles.bannerBtnText, { color: colors.primary }]}>Shop Now</Text>
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Categories</Text>
          <Pressable>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </Pressable>
        </View>
        <View style={styles.catGrid}>
          {CATEGORIES.map((c) => <CategoryChip key={c.label} item={c} />)}
        </View>

        {/* Featured Products */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Featured Products</Text>
          <Pressable>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </Pressable>
        </View>
        {FEATURED.map((p) => <ProductCard key={p.name} item={p} />)}

        {/* Quick Reorder */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Quick Reorder</Text>
        </View>
        <View style={[styles.reorderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MaterialCommunityIcons name="clock-fast" size={28} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.reorderTitle, { color: colors.foreground }]}>Last Order — 3 items</Text>
            <Text style={[styles.reorderSub, { color: colors.mutedForeground }]}>Ordered on 28 Jun 2026 · ₹1,240</Text>
          </View>
          <Pressable style={[styles.reorderBtn, { borderColor: colors.primary }]}>
            <Text style={[styles.reorderBtnText, { color: colors.primary }]}>Reorder</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Inter_400Regular',
  },
  businessName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FBBC05',
    borderWidth: 1.5,
    borderColor: '#0F9D58',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
  },
  banner: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  bannerSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  bannerBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bannerBtnText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catChip: {
    width: '22%',
    alignItems: 'center',
    gap: 6,
  },
  catIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catLabel: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  productCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    gap: 14,
  },
  productImg: {
    width: 72,
    height: 72,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  productGeneric: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  mrp: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    fontFamily: 'Inter_400Regular',
  },
  discBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stockText: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  addBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reorderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  reorderTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  reorderSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  reorderBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  reorderBtnText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});
