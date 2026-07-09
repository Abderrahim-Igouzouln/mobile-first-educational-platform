import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useController, UseControllerProps, FieldValues } from 'react-hook-form';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';
import { radius } from '../../constants/radius';

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  options: Option[];
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  options,
}: FormSelectProps<T>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, rules });
  const [visible, setVisible] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.trigger, error && styles.triggerError]}
        onPress={() => setVisible(true)}
        role="button"
        accessibilityLabel={label ? `${label}, ${selected?.label ?? 'Sélectionner'}` : 'Sélectionner'}
      >
        <Text style={[styles.triggerText, !selected && styles.placeholder]}>
          {selected?.label ?? 'Sélectionner...'}
        </Text>
        <ChevronDown size={20} color={colors.neutral.textMuted} />
      </Pressable>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
        statusBarTranslucent
      >
        <Pressable onPress={() => setVisible(false)} style={styles.overlay}>
          <View
            style={styles.sheet}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.sheetTitle}>{label ?? 'Sélectionner'}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.option, item.value === value && styles.optionSelected]}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    ...typography.label,
    color: colors.neutral.text,
    textTransform: 'uppercase',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.neutral.border,
    borderRadius: radius.md,
    backgroundColor: colors.neutral.surface,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  triggerError: {
    borderColor: colors.semantic.error,
  },
  triggerText: {
    flex: 1,
    ...typography.body,
    color: colors.neutral.text,
  },
  placeholder: {
    color: colors.neutral.textMuted,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.semantic.error,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.neutral.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.neutral.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
    maxHeight: '60%',
  },
  sheetTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.lg,
  },
  option: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
  },
  optionSelected: {
    backgroundColor: colors.brand.offWhite,
  },
  optionText: {
    ...typography.body,
    color: colors.neutral.text,
  },
  optionTextSelected: {
    color: colors.brand.orange,
    fontFamily: typography.button.fontFamily,
    fontWeight: '700' as const,
  },
});
