import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { LoadingSpinner } from '../../../shared/components/ui/feedback/LoadingSpinner';
import { DomainCard } from '../components/DomainCard';
import { useDomains } from '../services/courseService';
import type { Domain } from '../courses.types';
import type { CourseStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<CourseStackParamList, 'DomainsScreen'>;

export const DomainsScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { data: domains, isLoading, isError } = useDomains();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDomains = useMemo(() => {
    if (!domains) return [];
    if (!searchQuery.trim()) return domains;
    const q = searchQuery.toLowerCase();
    return domains.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.technologiesCount > 0,
    );
  }, [domains, searchQuery]);

  const handleDomainPress = (domain: Domain) => {
    navigation.navigate('TechnologiesScreen', { domainId: domain.slug });
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.greeting}>Explorer</Text>
        <Text style={styles.title}>Domaines</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={18} color={colors.neutral.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une technologie..."
          placeholderTextColor={colors.neutral.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {isError ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Impossible de charger les domaines.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDomains}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DomainCard domain={item} onPress={() => handleDomainPress(item)} />
          )}
          ListEmptyComponent={
            <View style={styles.centerContent}>
              <Text style={styles.emptyText}>
                {searchQuery
                  ? 'Aucun domaine trouvé pour votre recherche.'
                  : 'Aucun domaine disponible.'}
              </Text>
            </View>
          }
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  greeting: {
    ...typography.body,
    color: colors.neutral.textLight,
    marginBottom: spacing.xxs,
  },
  title: {
    ...typography.display,
    color: colors.neutral.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.neutral.text,
    height: 44,
  },
  list: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.huge,
  },
  row: {
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  errorText: {
    ...typography.body,
    color: colors.semantic.error,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.neutral.textMuted,
    textAlign: 'center',
  },
});
