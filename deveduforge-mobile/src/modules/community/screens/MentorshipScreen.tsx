import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Search, GraduationCap, Star } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { MentorCard } from '../components/MentorCard';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { useMentors } from '../services/communityService';

const DOMAINS = ['Tous', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'Data Science', 'UI/UX'];

const PRICE_RANGES = [
  { label: 'Tous les prix', min: 0, max: Infinity },
  { label: 'Moins de 30€', min: 0, max: 30 },
  { label: '30€ - 60€', min: 30, max: 60 },
  { label: 'Plus de 60€', min: 60, max: Infinity },
];

export default function MentorshipScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDomain, setActiveDomain] = useState('Tous');
  const [activePriceIndex, setActivePriceIndex] = useState(0);
  const { data: mentors = [] } = useMentors();

  const handleBook = (_mentorId: string) => {
    // Navigate to booking
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain =
      activeDomain === 'Tous' ||
      mentor.expertise.some((e) => e.toLowerCase().includes(activeDomain.toLowerCase()));

    const priceRange = PRICE_RANGES[activePriceIndex];
    const matchesPrice =
      mentor.pricePerSession >= priceRange.min && mentor.pricePerSession < priceRange.max;

    return matchesSearch && matchesDomain && matchesPrice;
  });

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Mentorat</Text>
          <Text style={styles.subtitle}>
            Apprenez auprès d'experts du secteur
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={colors.neutral.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher par nom, domaine..."
            placeholderTextColor={colors.neutral.textMuted}
            accessibilityLabel="Rechercher un mentor"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {DOMAINS.map((domain) => (
            <Pressable
              key={domain}
              style={[styles.filterChip, activeDomain === domain && styles.filterChipActive]}
              onPress={() => setActiveDomain(domain)}
              role="button"
              accessibilityState={{ selected: activeDomain === domain }}
            >
              <Text style={[styles.filterText, activeDomain === domain && styles.filterTextActive]}>
                {domain}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.priceScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {PRICE_RANGES.map((range, index) => (
            <Pressable
              key={range.label}
              style={[styles.priceChip, activePriceIndex === index && styles.priceChipActive]}
              onPress={() => setActivePriceIndex(index)}
              role="button"
              accessibilityState={{ selected: activePriceIndex === index }}
            >
              <Text style={[styles.priceText, activePriceIndex === index && styles.priceTextActive]}>
                {range.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.mentorsList}>
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              onPress={() => {}}
              onBook={handleBook}
            />
          ))}
          {filteredMentors.length === 0 && (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Aucun mentor trouvé</Text>
              <Text style={styles.emptyText}>
                Essayez de modifier vos filtres.
              </Text>
            </Card>
          )}
        </View>

        <Card style={styles.mentorCtaCard}>
          <GraduationCap size={40} color={colors.brand.orange} />
          <Text style={styles.ctaTitle}>Devenir mentor</Text>
          <Text style={styles.ctaText}>
            Partagez votre expertise et aidez d'autres développeurs à progresser. Rejoignez notre
            programme de mentorat.
          </Text>
          <View style={styles.ctaStatsRow}>
            <View style={styles.ctaStat}>
              <Star size={16} color={colors.brand.orange} />
              <Text style={styles.ctaStatValue}>4.8</Text>
              <Text style={styles.ctaStatLabel}>Note moyenne</Text>
            </View>
            <View style={styles.ctaStatDivider} />
            <View style={styles.ctaStat}>
              <Text style={styles.ctaStatValue}>550+</Text>
              <Text style={styles.ctaStatLabel}>Sessions/mois</Text>
            </View>
          </View>
          <Button variant="secondary" fullWidth onPress={() => {}}>
            Postuler comme mentor
          </Button>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.display,
    color: colors.neutral.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.neutral.textLight,
    marginTop: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    marginHorizontal: spacing.lg,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.neutral.text,
    paddingVertical: spacing.md,
  },
  filtersScroll: {
    marginBottom: spacing.sm,
  },
  filtersContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.neutral.borderDark,
    backgroundColor: colors.neutral.surface,
  },
  filterChipActive: {
    borderColor: colors.brand.orange,
    backgroundColor: colors.brand.offWhite,
  },
  filterText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.neutral.textLight,
  },
  filterTextActive: {
    color: colors.brand.orange,
  },
  priceScroll: {
    marginBottom: spacing.xxl,
  },
  priceChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.neutral.borderDark,
    backgroundColor: colors.neutral.surface,
  },
  priceChipActive: {
    borderColor: colors.brand.navy,
    backgroundColor: colors.brand.offWhite,
  },
  priceText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.neutral.textLight,
  },
  priceTextActive: {
    color: colors.brand.navy,
  },
  mentorsList: {
    paddingHorizontal: spacing.lg,
  },
  emptyCard: {
    alignItems: 'center',
    padding: spacing.xxxl,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    marginTop: spacing.md,
  },
  emptyText: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  mentorCtaCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  ctaTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    marginTop: spacing.sm,
  },
  ctaText: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  ctaStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ctaStat: {
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.xl,
  },
  ctaStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.neutral.border,
  },
  ctaStatValue: {
    ...typography.h3,
    color: colors.neutral.text,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ctaStatLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  bottomSpacer: {
    height: spacing.huge,
  },
});
