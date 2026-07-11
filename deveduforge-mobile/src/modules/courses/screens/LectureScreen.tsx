import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { BookmarkButton } from '../components/BookmarkButton';
import { useNotes } from '../hooks/useNotes';
import { useBookmarkToggle } from '../hooks/useBookmarks';
import { useCourse } from '../services/courseService';
import type { CourseStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<CourseStackParamList, 'LectureScreen'>;
type ScreenRoute = RouteProp<CourseStackParamList, 'LectureScreen'>;

export const LectureScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { courseId, lessonId, lectureId } = route.params;

  const { data: courseData } = useCourse(courseId);
  const { toggle } = useBookmarkToggle();
  const { notes, loading: notesLoading, saveNote, deleteNote } = useNotes(lectureId);
  const [newNote, setNewNote] = useState('');

  const lesson = courseData?.lessons?.find((l) => l.id === lessonId);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await saveNote(newNote.trim());
    setNewNote('');
  };

  if (!lesson) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBar}>
          <Pressable
            style={styles.backCircle}
            onPress={() => navigation.goBack()}
            role="button"
            accessibilityLabel="Retour"
          >
            <ArrowLeft size={20} color={colors.neutral.text} />
          </Pressable>
          <Text style={styles.lessonLabel} numberOfLines={1}>
            {lesson.title}
          </Text>
          <BookmarkButton
            isBookmarked={lesson.isBookmarked}
            onToggle={() => toggle(lesson.id)}
          />
        </View>

        <View style={styles.contentSection}>
          {lesson.content ? (
            <MarkdownRenderer content={lesson.content} />
          ) : (
            <Text style={styles.noContent}>Aucun contenu pour cette lecture.</Text>
          )}
        </View>

        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Notes</Text>

          {notes.length > 0 ? (
            notes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <Text style={styles.noteText}>{note.content}</Text>
                <View style={styles.noteFooter}>
                  <Text style={styles.noteDate}>
                    {new Date(note.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                  <Pressable onPress={() => deleteNote(note.id)}>
                    <Trash2 size={14} color={colors.neutral.textMuted} />
                  </Pressable>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noNotes}>
              Aucune note pour cette leçon. Ajoutez-en une ci-dessous.
            </Text>
          )}

          <View style={styles.addNoteRow}>
            <TextInput
              style={styles.noteInput}
              placeholder="Ajouter une note..."
              placeholderTextColor={colors.neutral.textMuted}
              value={newNote}
              onChangeText={setNewNote}
              multiline
              numberOfLines={2}
            />
            <Pressable
              style={[styles.addNoteButton, !newNote.trim() && styles.addNoteButtonDisabled]}
              onPress={handleAddNote}
              disabled={!newNote.trim()}
            >
              <Plus size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.huge,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  lessonLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    flex: 1,
    marginRight: spacing.sm,
  },
  contentSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  noContent: {
    ...typography.body,
    color: colors.neutral.textMuted,
    fontStyle: 'italic',
  },
  notesSection: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  notesTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.md,
  },
  noteCard: {
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  noteText: {
    ...typography.body,
    color: colors.neutral.text,
    marginBottom: spacing.sm,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteDate: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  noNotes: {
    ...typography.body,
    color: colors.neutral.textMuted,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  addNoteRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  noteInput: {
    flex: 1,
    backgroundColor: colors.neutral.surface,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: radius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.neutral.text,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  addNoteButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.brand.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNoteButtonDisabled: {
    backgroundColor: colors.neutral.surfaceAlt,
  },
});
