import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DomainCard } from './DomainCard';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import type { Domain } from '../home.types';

interface DomainCarouselProps {
  domains: Domain[];
  onDomainPress?: (domain: Domain) => void;
}

export const DomainCarousel: React.FC<DomainCarouselProps> = ({ domains, onDomainPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Domaines</Text>
      <FlatList
        data={domains}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DomainCard
            domain={item}
            onPress={() => onDomainPress?.(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xxl,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  list: {
    paddingHorizontal: spacing.lg,
  },
});
