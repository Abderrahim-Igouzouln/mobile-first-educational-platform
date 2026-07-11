import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Check } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/Card';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { useAppDispatch } from '../../../lib/redux/hooks/useAppDispatch';
import { setLocale } from '../../../lib/redux/slices/ui.slice';
import { setItem } from '../../../core/storage/asyncStorage';
import type { ProfileStackParamList } from '../../../core/navigation/navigation.types';

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

interface LanguageOption {
  code: 'fr' | 'ar' | 'en';
  label: string;
  nativeLabel: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'fr', label: 'Français', nativeLabel: 'Français' },
  { code: 'en', label: 'Anglais', nativeLabel: 'English' },
  { code: 'ar', label: 'Arabe', nativeLabel: 'العربية' },
];

export default function LanguageScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<'fr' | 'ar' | 'en'>('fr');

  const handleSelect = async (code: 'fr' | 'ar' | 'en') => {
    setSelected(code);
    dispatch(setLocale(code));
    await setItem('app_language', code);
    navigation.goBack();
  };

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite}>
      <View style={styles.container}>
        <Text style={styles.description}>
          Choisissez votre langue préférée pour l'application.
        </Text>
        <Card style={styles.card}>
          {LANGUAGES.map((lang, index) => (
            <React.Fragment key={lang.code}>
              <Pressable
                style={styles.option}
                onPress={() => handleSelect(lang.code)}
                role="radio"
                accessibilityState={{ selected: selected === lang.code }}
                accessibilityLabel={lang.label}
              >
                <View style={styles.optionLeft}>
                  <Text style={styles.optionLabel}>{lang.label}</Text>
                  <Text style={styles.optionNative}>{lang.nativeLabel}</Text>
                </View>
                <View style={[styles.radio, selected === lang.code && styles.radioSelected]}>
                  {selected === lang.code && (
                    <Check size={14} color={colors.neutral.surface} />
                  )}
                </View>
              </Pressable>
              {index < LANGUAGES.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </Card>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  description: {
    ...typography.body,
    color: colors.neutral.textLight,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  card: {
    padding: 0,
    paddingVertical: spacing.xs,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  optionLeft: {
    gap: spacing.xxs,
  },
  optionLabel: {
    ...typography.body,
    color: colors.neutral.text,
  },
  optionNative: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.neutral.borderDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: colors.brand.orange,
    borderColor: colors.brand.orange,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral.border,
    marginHorizontal: spacing.lg,
  },
});
