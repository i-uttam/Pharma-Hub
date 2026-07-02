import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MedicineCard from '@/components/MedicineCard';
import { CATEGORIES, searchMedicines } from '@/data/medicines';
import { useColors } from '@/hooks/useColors';

const SEARCH_HISTORY_KEY = '@pharma_search_history';
const TRENDING = ['Paracetamol', 'Amoxicillin', 'Vitamin D3', 'Omeprazole', 'Metformin', 'Insulin'];

export default function SearchScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 200);
    AsyncStorage.getItem(SEARCH_HISTORY_KEY)
      .then((s) => { if (s) setHistory(JSON.parse(s)); })
      .catch(() => {});
  }, []);

  function saveToHistory(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...history.filter((h) => h !== trimmed)].slice(0, 8);
    setHistory(updated);
    AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated)).catch(() => {});
  }

  function clearHistory() {
    setHistory([]);
    AsyncStorage.removeItem(SEARCH_HISTORY_KEY).catch(() => {});
  }

  const results = useMemo(() => {
    let list = searchMedicines(query);
    if (activeCategory) list = list.filter((m) => m.category === activeCategory);
    return list;
  }, [query, activeCategory]);

  const showResults = query.length > 0 || activeCategory !== null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Search bar header */}
      <View style={[styles.header, { paddingTop: topPad + 8, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={[styles.searchRow, { backgroundColor: colors.muted, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.mutedForeground} />
          <TextInput
            ref={inputRef}
            style={[styles.searchInput, { color: colors.foreground }]}
            placeholder="Search medicines, brands, generics…"
            placeholderTextColor={colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={() => saveToHistory(query)}
            autoCapitalize="none"
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.mutedForeground} />
            </Pressable>
          ) : (
            <Ionicons name="barcode-outline" size={20} color={colors.mutedForeground} />
          )}
        </View>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.cancelText, { color: colors.primary }]}>Cancel</Text>
        </Pressable>
      </View>

      {/* Category filter chips */}
      {showResults && (
        <View style={styles.chipScroll}>
          <Pressable
            style={[styles.catChip, !activeCategory && { backgroundColor: colors.primary }]}
            onPress={() => setActiveCategory(null)}
          >
            <Text style={[styles.catChipText, { color: !activeCategory ? '#FFF' : colors.mutedForeground }]}>All</Text>
          </Pressable>
          {CATEGORIES.map((c) => (
            <Pressable
              key={c.id}
              style={[
                styles.catChip,
                { borderColor: c.color + '55' },
                activeCategory === c.id && { backgroundColor: c.color },
              ]}
              onPress={() => setActiveCategory(activeCategory === c.id ? null : c.id)}
            >
              <MaterialCommunityIcons name={c.icon as any} size={13} color={activeCategory === c.id ? '#FFF' : c.color} />
              <Text style={[styles.catChipText, { color: activeCategory === c.id ? '#FFF' : colors.foreground }]}>
                {c.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {!showResults ? (
        /* Home state — no query */
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: bottomPad + 80, gap: 24 }}>
          {/* History */}
          {history.length > 0 && (
            <View style={{ gap: 12 }}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent Searches</Text>
                <Pressable onPress={clearHistory}>
                  <Text style={[styles.clearText, { color: colors.destructive }]}>Clear</Text>
                </Pressable>
              </View>
              {history.map((h) => (
                <Pressable key={h} style={styles.historyRow} onPress={() => setQuery(h)}>
                  <Ionicons name="time-outline" size={18} color={colors.mutedForeground} />
                  <Text style={[styles.historyText, { color: colors.foreground }]}>{h}</Text>
                  <Ionicons name="arrow-forward-outline" size={16} color={colors.mutedForeground} style={{ marginLeft: 'auto' }} />
                </Pressable>
              ))}
            </View>
          )}

          {/* Trending */}
          <View style={{ gap: 12 }}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Trending Searches</Text>
            <View style={styles.trendingWrap}>
              {TRENDING.map((t) => (
                <Pressable
                  key={t}
                  style={[styles.trendingChip, { backgroundColor: colors.muted }]}
                  onPress={() => setQuery(t)}
                >
                  <Ionicons name="trending-up-outline" size={14} color={colors.primary} />
                  <Text style={[styles.trendingText, { color: colors.foreground }]}>{t}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Browse categories */}
          <View style={{ gap: 12 }}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Browse by Category</Text>
            <View style={styles.catGrid}>
              {CATEGORIES.slice(0, 8).map((c) => (
                <Pressable
                  key={c.id}
                  style={[styles.catCard, { backgroundColor: c.color + '14', borderColor: c.color + '33' }]}
                  onPress={() => router.push(`/products/${c.id}`)}
                >
                  <MaterialCommunityIcons name={c.icon as any} size={24} color={c.color} />
                  <Text style={[styles.catCardText, { color: colors.foreground }]}>{c.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        /* Results state */
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: bottomPad + 80 }}
          onScrollBeginDrag={() => saveToHistory(query)}
          ListHeaderComponent={
            query.length > 0 ? (
              <Text style={[styles.resultCount, { color: colors.mutedForeground }]}>
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </Text>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={64} color={colors.mutedForeground} />
              <Text style={[styles.emptyTitle, { color: colors.foreground }]}>No results found</Text>
              <Text style={[styles.emptySub, { color: colors.mutedForeground }]}>
                Try a different medicine name or generic name
              </Text>
            </View>
          }
          renderItem={({ item }) => <MedicineCard medicine={item} compact />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1 },
  searchRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, height: 44, borderRadius: 12, borderWidth: 1 },
  searchInput: { flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular' },
  cancelText: { fontSize: 15, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  chipScroll: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16, paddingVertical: 10 },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: 'transparent' },
  catChipText: { fontSize: 12, fontWeight: '500', fontFamily: 'Inter_500Medium' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  clearText: { fontSize: 13, fontWeight: '500', fontFamily: 'Inter_500Medium' },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  historyText: { fontSize: 15, fontFamily: 'Inter_400Regular' },
  trendingWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  trendingChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  trendingText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  catCard: { width: '47%', borderWidth: 1, borderRadius: 14, padding: 14, alignItems: 'center', gap: 8 },
  catCardText: { fontSize: 13, fontWeight: '500', fontFamily: 'Inter_500Medium', textAlign: 'center' },
  resultCount: { fontSize: 13, fontFamily: 'Inter_400Regular', marginBottom: 12 },
  emptyState: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  emptySub: { fontSize: 14, fontFamily: 'Inter_400Regular', textAlign: 'center' },
});
