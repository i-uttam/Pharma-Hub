import React, { useState } from 'react';
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

type OrderStatus = 'Pending' | 'Accepted' | 'Packed' | 'Dispatched' | 'Delivered' | 'Cancelled';

type Order = {
  id: string;
  date: string;
  items: number;
  total: string;
  status: OrderStatus;
};

const ORDERS: Order[] = [
  { id: 'ORD-20240628-001', date: 'Jun 28, 2026', items: 12, total: '₹4,320', status: 'Dispatched' },
  { id: 'ORD-20240625-002', date: 'Jun 25, 2026', items: 5, total: '₹1,240', status: 'Delivered' },
  { id: 'ORD-20240622-003', date: 'Jun 22, 2026', items: 8, total: '₹2,890', status: 'Delivered' },
  { id: 'ORD-20240620-004', date: 'Jun 20, 2026', items: 3, total: '₹680', status: 'Cancelled' },
  { id: 'ORD-20240618-005', date: 'Jun 18, 2026', items: 20, total: '₹8,450', status: 'Delivered' },
];

const STATUS_CONFIG: Record<OrderStatus, { color: string; bg: string; icon: string }> = {
  Pending:    { color: '#F57F17', bg: '#FFF8E1', icon: 'time-outline' },
  Accepted:   { color: '#4285F4', bg: '#E8F0FE', icon: 'checkmark-circle-outline' },
  Packed:     { color: '#9C27B0', bg: '#F3E5F5', icon: 'cube-outline' },
  Dispatched: { color: '#0F9D58', bg: '#E6F4ED', icon: 'car-outline' },
  Delivered:  { color: '#34A853', bg: '#E6F4ED', icon: 'checkmark-done-circle-outline' },
  Cancelled:  { color: '#EA4335', bg: '#FEECEB', icon: 'close-circle-outline' },
};

const TIMELINE_STEPS: OrderStatus[] = ['Pending', 'Accepted', 'Packed', 'Dispatched', 'Delivered'];

function OrderCard({ order, onPress }: { order: Order; onPress: () => void }) {
  const colors = useColors();
  const cfg = STATUS_CONFIG[order.status];

  return (
    <Pressable
      style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
    >
      <View style={styles.orderTop}>
        <View>
          <Text style={[styles.orderId, { color: colors.foreground }]}>{order.id}</Text>
          <Text style={[styles.orderDate, { color: colors.mutedForeground }]}>{order.date} · {order.items} items</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
          <Ionicons name={cfg.icon as any} size={14} color={cfg.color} />
          <Text style={[styles.statusText, { color: cfg.color }]}>{order.status}</Text>
        </View>
      </View>

      {/* Progress bar for non-cancelled orders */}
      {order.status !== 'Cancelled' && (
        <View style={styles.progressRow}>
          {TIMELINE_STEPS.map((step, i) => {
            const stepIndex = TIMELINE_STEPS.indexOf(order.status);
            const done = i <= stepIndex;
            return (
              <View key={step} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.dot, { backgroundColor: done ? colors.primary : colors.border }]} />
                {i < TIMELINE_STEPS.length - 1 && (
                  <View style={[styles.line, { backgroundColor: i < stepIndex ? colors.primary : colors.border }]} />
                )}
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.orderBottom}>
        <Text style={[styles.orderTotal, { color: colors.primary }]}>{order.total}</Text>
        <View style={styles.orderActions}>
          <Pressable style={[styles.actionBtn, { borderColor: colors.border }]}>
            <MaterialCommunityIcons name="file-document-outline" size={14} color={colors.foreground} />
            <Text style={[styles.actionText, { color: colors.foreground }]}>Invoice</Text>
          </Pressable>
          {order.status === 'Delivered' && (
            <Pressable style={[styles.actionBtn, { borderColor: colors.primary, backgroundColor: colors.successLight ?? '#E6F4ED' }]}>
              <Ionicons name="repeat-outline" size={14} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.primary }]}>Reorder</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default function OrdersScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<'current' | 'past'>('current');

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const filtered = ORDERS.filter((o) =>
    filter === 'current'
      ? ['Pending', 'Accepted', 'Packed', 'Dispatched'].includes(o.status)
      : ['Delivered', 'Cancelled'].includes(o.status),
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { paddingTop: topPad + 16, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>My Orders</Text>
        <View style={[styles.filterRow, { borderColor: colors.border }]}>
          {(['current', 'past'] as const).map((f) => (
            <Pressable
              key={f}
              style={[styles.filterBtn, filter === f && { backgroundColor: colors.primary }]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f ? { color: '#FFFFFF' } : { color: colors.mutedForeground }]}>
                {f === 'current' ? 'Current Orders' : 'Past Orders'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="package-variant-closed" size={60} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No {filter} orders</Text>
          </View>
        ) : (
          filtered.map((order) => (
            <OrderCard key={order.id} order={order} onPress={() => {}} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    gap: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  filterRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 9,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  orderCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  orderDate: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  line: {
    flex: 1,
    height: 2,
  },
  orderBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
  },
});
