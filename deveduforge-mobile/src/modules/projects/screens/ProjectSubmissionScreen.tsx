import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { ArrowLeft, FileUp, GitBranch, Send, X } from 'lucide-react-native';
import type { ProjectStackParamList } from '../projects.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';

export const ProjectSubmissionScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<string[]>([]);

  const handleAddFile = () => {
    setFiles((prev) => [...prev, `fichier-${prev.length + 1}.png`]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ScreenWrapper>
      <View style={styles.topBar}>
        <Pressable style={styles.backButton}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topTitle}>Soumettre le projet</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Input
          label="Titre de la soumission"
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Site vitrine - V1"
        />

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder="Décrivez ce que vous avez réalisé..."
            placeholderTextColor={colors.neutral.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Fichiers / Captures d'écran</Text>

          <Pressable style={styles.uploadArea} onPress={handleAddFile}>
            <FileUp size={28} color={colors.neutral.textMuted} />
            <Text style={styles.uploadText}>
              Appuyez pour ajouter des fichiers
            </Text>
          </Pressable>

          {files.length > 0 && (
            <View style={styles.fileList}>
              {files.map((file, index) => (
                <View key={index} style={styles.fileItem}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {file}
                  </Text>
                  <Pressable onPress={() => handleRemoveFile(index)}>
                    <X size={18} color={colors.semantic.error} />
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </View>

        <Input
          label="Lien GitHub"
          value={githubUrl}
          onChangeText={setGithubUrl}
          placeholder="https://github.com/utilisateur/projet"
          leftIcon={GitBranch}
          autoCapitalize="none"
        />

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Notes pour le reviewer</Text>
          <TextInput
            style={styles.textArea}
            value={notes}
            onChangeText={setNotes}
            placeholder="Points d'attention, difficultés rencontrées..."
            placeholderTextColor={colors.neutral.textMuted}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <Button icon={Send} fullWidth onPress={() => {}}>
          Soumettre
        </Button>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: spacing.xl,
    gap: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxxl : spacing.xxl,
  },
  fieldGroup: {
    gap: spacing.xs,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.neutral.text,
    textTransform: 'uppercase',
  },
  textArea: {
    ...typography.body,
    color: colors.neutral.text,
    backgroundColor: colors.neutral.surface,
    borderWidth: 1.5,
    borderColor: colors.neutral.border,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 100,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: colors.neutral.border,
    borderStyle: 'dashed',
    borderRadius: radius.md,
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.surfaceAlt,
  },
  uploadText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  fileList: {
    gap: spacing.sm,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral.surfaceAlt,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  fileName: {
    ...typography.bodySmall,
    color: colors.neutral.text,
    flex: 1,
    marginRight: spacing.sm,
  },
});
