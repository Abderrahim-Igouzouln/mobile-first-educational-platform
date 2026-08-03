import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import { X } from 'lucide-react-native';
import { colors } from '../../../constants/colors';
import { typography } from '../../../constants/typography';
import { spacing } from '../../../constants/spacing';
import { radius } from '../../../constants/radius';

interface ModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  destructive?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  onClose,
  children,
  destructive = false,
}) => {
  const handlePress = (fn: () => void) => (e: any) => {
    e?.stopPropagation?.();
    fn();
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        onPress={destructive ? undefined : onClose}
        style={styles.overlay}
      >
        <Pressable onPress={handlePress(Keyboard.dismiss)} style={styles.fill}>
          <View
            style={styles.sheet}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Pressable
                onPress={handlePress(onClose)}
                style={styles.closeButton}
                role="button"
                accessibilityLabel="Fermer"
              >
                <X size={24} color={colors.neutral.text} />
              </Pressable>
            </View>
            <View style={styles.content}>{children}</View>
            <Pressable
              style={styles.cancelButton}
              onPress={handlePress(onClose)}
              role="button"
              accessibilityLabel="Annuler"
            >
              <Text style={styles.cancelText}>Annuler</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.neutral.overlay,
    justifyContent: 'flex-end',
  },
  fill: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.neutral.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.xxl,
    paddingBottom: Platform.OS === 'ios' ? 34 : spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.neutral.text,
    flex: 1,
  },
  closeButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  content: {
    marginBottom: spacing.xxl,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  cancelText: {
    ...typography.button,
    color: colors.neutral.textLight,
  },
});
