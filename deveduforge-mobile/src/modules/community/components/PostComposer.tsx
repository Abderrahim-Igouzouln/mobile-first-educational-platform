import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Send } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';

interface PostComposerProps {
  placeholder?: string;
  onSubmit: (text: string) => void;
}

export const PostComposer: React.FC<PostComposerProps> = ({
  placeholder = 'Écrire une réponse...',
  onSubmit,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText('');
  };

  const isDisabled = text.trim().length === 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral.textMuted}
          multiline
          maxLength={1000}
          accessibilityLabel={placeholder}
        />
        <Pressable
          style={[styles.sendButton, isDisabled && styles.sendButtonDisabled]}
          onPress={handleSubmit}
          disabled={isDisabled}
          role="button"
          accessibilityLabel="Envoyer"
        >
          <Send size={18} color={isDisabled ? colors.neutral.textMuted : colors.neutral.surface} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    ...typography.body,
    color: colors.neutral.text,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.brand.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.neutral.surfaceAlt,
  },
});
