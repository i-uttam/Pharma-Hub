import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const CATEGORIES = [
  { icon: 'pill', label: 'Tablets', count: 1240, color: '#4285F4' },
  { icon: 'pill-multiple', label: 'Capsules', count: 856, color: '#0F9D58' },
  { icon: 'needle', label: 'Injections', count: 432, color: '#EA4335' },
  { icon: 'bottle-tonic-plus', label: 'Syrups', count: 378, color: '#FBBC05' },
  { icon: 'eye-drop', label: 'Drops', count: 215, color: '#00BCD4' },
  { icon: 'lotion-plus', label: 'Cream & Gel', count: 290, color: '#FF9800' },
  { icon: 'bandage', label: 'Surgical', count: 540, color: '#9C27B0' },
  { icon: 'heart-pulse', label: 'Medical Devices', count: 184, color: '#F44336' },
  { icon: 'leaf', label: 'Ayurvedic', count: 320, color: '#34A853' },
  { icon: 'shield-plus', label: 'OTC', count: 675, color: '#607D8B' },
  { icon: 'baby-face', label: 'Baby Care', count: 145, color: '#E91E63' },
  { icon: 'account-heart', label: 'Personal Care', count: 230, color: '#673AB7' },
  { icon: 'nutrition', label: 'Supplements', count: 412, color: '#FF5722' },
  { icon: 'stethoscope', label: 'Healthcare', count: 198, color: '#2196F3' },
  { icon: 'microscope', label: 'Diagnostic', count: 88, color: '#795548' },
];

export default function CategoriesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string | null>(null);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 16, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Categories</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          {CATEGORIES.length} categories · 5,000+ products
        </Text>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.label}
        numColumns={2}
        contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        scrollEnabled={!!CATEGORIES.length}
        renderItem={({ item }) => {
          const isSelected = selected === item.label;
          return (
            <Pressable
              style={[
                styles.card,
                {
                  backgroundColor: isSelected ? item.color : colors.card,
                  borderColor: isSelected ? item.color : colors.border,
                },
              ]}
              onPress={() => setSelected(isSelected ? null : item.label)}
            >
              <View style={[styles.iconWrap, { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : item.color + '18' }]}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={28}
                  color={isSelected ? '#FFFFFF' : item.color}
                />
              </View>
              <Text style={[styles.cardLabel, { color: isSelected ? '#FFFFFF' : colors.foreground }]}>
                {item.label}
              </Text>
              <Text style={[styles.cardCount, { color: isSelected ? 'rgba(255,255,255,0.75)' : colors.mutedForeground }]}>
                {item.count.toLocaleString()} products
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  card: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 18,
    padding: 18,
    gap: 10,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  cardCount: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
