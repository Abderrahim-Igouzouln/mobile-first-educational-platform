import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Search, X, ExternalLink, Clock } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { SearchBar } from '../components/SearchBar';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { useDebounce } from '../../../core/hooks/useDebounce';
import { useSearchResults } from '../services/homeService';

const RECENT_SEARCHES_KEY = 'recent_searches';
const MAX_RECENT = 5;

interface SearchResult {
  id: string;
  type: 'course' | 'technology' | 'lesson';
  title: string;
  subtitle: string;
}

const TYPE_LABELS: Record<string, string> = {
  course: 'Cours',
  technology: 'Technologie',
  lesson: 'Leçon',
};

const CATEGORIES = [
  { key: 'all', label: 'Tout' },
  { key: 'course', label: 'Cours' },
  { key: 'lesson', label: 'Leçons' },
  { key: 'technology', label: 'Technologies' },
] as const;

type Category = typeof CATEGORIES[number]['key'];

export default function SearchScreen() {
  const { colors, typography } = useTheme();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [category, setCategory] = useState<Category>('all');

  const debouncedQuery = useDebounce(query, 300);
  const { data: searchResults, isLoading } = useSearchResults(debouncedQuery);

  useEffect(() => {
    AsyncStorage.getItem(RECENT_SEARCHES_KEY).then((raw) => {
      if (raw) setRecentSearches(JSON.parse(raw));
    });
  }, []);

  const saveSearch = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter((s) => s !== trimmed)].slice(0, MAX_RECENT);
    setRecentSearches(updated);
    await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  }, [recentSearches]);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const results = useMemo(() => {
    const raw = (debouncedQuery.trim() ? (searchResults as SearchResult[] ?? []) : []);
    if (category === 'all') return raw;
    return raw.filter((r) => r.type === category);
  }, [searchResults, debouncedQuery, category]);

  const clearRecent = useCallback(async () => {
    setRecentSearches([]);
    await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
  }, []);

  const removeRecentItem = useCallback(async (item: string) => {
    const updated = recentSearches.filter((s) => s !== item);
    setRecentSearches(updated);
    await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  }, [recentSearches]);

  const renderResultItem = ({ item }: { item: SearchResult }) => (
    <Pressable style={[styles.resultItem, { borderBottomColor: colors.neutral.border }]}>
      <View style={styles.resultLeft}>
        <View style={[styles.typeTag, { backgroundColor: colors.neutral.surfaceAlt }]}>
          <Text style={[styles.typeText, { color: colors.neutral.textLight }]}>
            {TYPE_LABELS[item.type]}
          </Text>
        </View>
        <View style={styles.resultContent}>
          <Text style={[typography.body, { color: colors.neutral.text, fontWeight: '600' }]}>
            {item.title}
          </Text>
          <Text style={[typography.bodySmall, { color: colors.neutral.textLight, marginTop: 2 }]}>
            {item.subtitle}
          </Text>
        </View>
      </View>
      <ExternalLink size={16} color={colors.neutral.textMuted} />
    </Pressable>
  );

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.empty}>
          <ActivityIndicator size="large" color={colors.brand.navy} />
        </View>
      );
    }
    if (debouncedQuery.trim()) {
      return (
        <View style={styles.empty}>
          <Search size={40} color={colors.neutral.textMuted} />
          <Text style={[typography.h2, { color: colors.neutral.text, marginTop: spacing.lg }]}>
            Aucun résultat
          </Text>
          <Text style={[typography.body, { color: colors.neutral.textLight, textAlign: 'center', marginTop: spacing.sm }]}>
            Vérifiez l'orthographe ou essayez un autre terme
          </Text>
        </View>
      );
    }
    if (recentSearches.length > 0) {
      return (
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={[typography.h3, { color: colors.neutral.text }]}>Récent</Text>
            <Pressable onPress={clearRecent}>
              <Text style={[typography.label, { color: colors.brand.orange }]}>Effacer</Text>
            </Pressable>
          </View>
          {recentSearches.map((item) => (
            <Pressable
              key={item}
              style={[styles.recentRow, { borderBottomColor: colors.neutral.border }]}
              onPress={() => setQuery(item)}
            >
              <Clock size={16} color={colors.neutral.textMuted} />
              <Text style={[typography.body, { color: colors.neutral.text, flex: 1, marginLeft: spacing.sm }]}>
                {item}
              </Text>
              <Pressable onPress={() => removeRecentItem(item)}>
                <X size={16} color={colors.neutral.textMuted} />
              </Pressable>
            </Pressable>
          ))}
        </View>
      );
    }
    return (
      <View style={styles.empty}>
        <Search size={40} color={colors.neutral.textMuted} />
        <Text style={[typography.h2, { color: colors.neutral.text, marginTop: spacing.lg }]}>
          Rechercher
        </Text>
        <Text style={[typography.body, { color: colors.neutral.textLight, textAlign: 'center', marginTop: spacing.sm }]}>
          Tapez un mot-clé pour trouver un cours, une technologie ou une leçon
        </Text>
      </View>
    );
  };

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surface} statusBarStyle="dark">
      <View style={styles.header}>
        <Text style={[typography.display, { color: colors.neutral.text }]}>Rechercher</Text>
      </View>
      <View style={styles.searchWrap}>
        <SearchBar onSearch={handleSearch} />
        {query.length > 0 && (
          <Pressable style={styles.clearBtn} onPress={handleClear}>
            <X size={18} color={colors.neutral.textMuted} />
          </Pressable>
        )}
      </View>

      {debouncedQuery.trim() && results.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.categories, { borderBottomColor: colors.neutral.border }]}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.key}
              onPress={() => setCategory(cat.key)}
              style={[
                styles.categoryTab,
                category === cat.key && { borderBottomWidth: 2, borderBottomColor: colors.brand.orange },
              ]}
            >
              <Text
                style={[
                  typography.label,
                  { color: category === cat.key ? colors.brand.orange : colors.neutral.textLight },
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderResultItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={results.length === 0 ? styles.listEmpty : styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    position: 'relative',
  },
  clearBtn: {
    position: 'absolute',
    right: spacing.lg + 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  categories: {
    maxHeight: 44,
    borderBottomWidth: 1,
    marginBottom: spacing.sm,
  },
  categoryTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  list: {
    paddingBottom: spacing.huge,
  },
  listEmpty: {
    flexGrow: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
  },
  resultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  typeTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
    marginRight: spacing.md,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  resultContent: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
    paddingTop: 80,
  },
  recentSection: {
    paddingHorizontal: spacing.lg,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
});
