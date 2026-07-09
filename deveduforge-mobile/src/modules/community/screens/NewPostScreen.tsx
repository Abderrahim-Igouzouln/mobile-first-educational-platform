import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ChevronLeft, X } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/Button';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { useCreatePost } from '../services/communityService';

const CATEGORIES = ['Programmation', 'Backend', 'Frontend', 'Mobile', 'DevOps', 'Data Science', 'Design', 'Carrière'];

const PREDEFINED_TAGS = [
  'React Native', 'TypeScript', 'JavaScript', 'Python', 'Node.js',
  'React', 'Docker', 'AWS', 'CSS', 'GraphQL', 'API', 'Testing',
];

export default function NewPostScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [category, setCategory] = useState('');
  const createPost = useCreatePost();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const addCustomTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
      setCustomTag('');
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const isFormValid = title.trim().length > 0 && content.trim().length > 0 && category.length > 0;

  const handlePublish = () => {
    if (!isFormValid) return;
    createPost.mutate({ title, content, tags: selectedTags, category });
  };

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} role="button" accessibilityLabel="Retour">
            <ChevronLeft size={24} color={colors.neutral.text} />
          </Pressable>
          <Text style={styles.topBarTitle}>Nouvelle discussion</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.flex}>
          <View style={styles.form}>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Titre de votre discussion"
              placeholderTextColor={colors.neutral.textMuted}
              accessibilityLabel="Titre"
            />

            <Text style={styles.sectionLabel}>Catégorie</Text>
            <View style={styles.categoryRow}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat}
                  style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
                  onPress={() => setCategory(category === cat ? '' : cat)}
                  role="button"
                  accessibilityState={{ selected: category === cat }}
                >
                  <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Contenu</Text>
            <TextInput
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
              placeholder="Décrivez votre question ou sujet en détail..."
              placeholderTextColor={colors.neutral.textMuted}
              multiline
              textAlignVertical="top"
              accessibilityLabel="Contenu"
            />

            <Text style={styles.sectionLabel}>Tags</Text>
            <View style={styles.tagsRow}>
              {PREDEFINED_TAGS.map((tag) => (
                <Pressable
                  key={tag}
                  style={[styles.tagChip, selectedTags.includes(tag) && styles.tagChipActive]}
                  onPress={() => toggleTag(tag)}
                  role="button"
                  accessibilityState={{ selected: selectedTags.includes(tag) }}
                >
                  <Text style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextActive]}>
                    {tag}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.customTagRow}>
              <TextInput
                style={styles.customTagInput}
                value={customTag}
                onChangeText={setCustomTag}
                placeholder="Ajouter un tag personnalisé"
                placeholderTextColor={colors.neutral.textMuted}
                onSubmitEditing={addCustomTag}
                returnKeyType="done"
                accessibilityLabel="Tag personnalisé"
              />
              <Button variant="outline" size="sm" onPress={addCustomTag} disabled={!customTag.trim()}>
                Ajouter
              </Button>
            </View>

            {selectedTags.length > 0 && (
              <View style={styles.selectedTagsRow}>
                {selectedTags.map((tag) => (
                  <View key={tag} style={styles.selectedTag}>
                    <Text style={styles.selectedTagText}>{tag}</Text>
                    <Pressable
                      onPress={() => removeTag(tag)}
                      role="button"
                      accessibilityLabel={`Supprimer ${tag}`}
                    >
                      <X size={14} color={colors.neutral.textLight} />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.publishSection}>
              <Button
                variant="primary"
                fullWidth
                onPress={handlePublish}
                disabled={!isFormValid || createPost.isPending}
              >
                {createPost.isPending ? 'Publication...' : 'Publier'}
              </Button>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarTitle: {
    ...typography.h3,
    color: colors.neutral.text,
  },
  form: {
    padding: spacing.lg,
  },
  titleInput: {
    ...typography.h2,
    color: colors.neutral.text,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
    minHeight: 52,
    ...shadows.sm,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.neutral.text,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.neutral.borderDark,
    backgroundColor: colors.neutral.surface,
  },
  categoryChipActive: {
    borderColor: colors.brand.orange,
    backgroundColor: colors.brand.offWhite,
  },
  categoryText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.neutral.textLight,
  },
  categoryTextActive: {
    color: colors.brand.orange,
  },
  contentInput: {
    ...typography.body,
    color: colors.neutral.text,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    minHeight: 160,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tagChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.neutral.borderDark,
    backgroundColor: colors.neutral.surface,
  },
  tagChipActive: {
    borderColor: colors.brand.navy,
    backgroundColor: colors.brand.offWhite,
  },
  tagText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.neutral.textLight,
  },
  tagTextActive: {
    color: colors.brand.navy,
  },
  customTagRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  customTagInput: {
    flex: 1,
    ...typography.body,
    color: colors.neutral.text,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
    borderWidth: 1.5,
    borderColor: colors.neutral.border,
  },
  selectedTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.brand.navy,
  },
  selectedTagText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.neutral.surface,
  },
  publishSection: {
    marginTop: spacing.xxl,
  },
  bottomSpacer: {
    height: spacing.huge,
  },
});
