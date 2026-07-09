import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { ProfileAvatar } from '../components/ProfileAvatar';
import { useAuth } from '../../../core/auth/useAuth';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [bio, setBio] = useState('');

  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase() || '?';

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surface}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.avatarSection}>
            <ProfileAvatar initials={initials} imageUrl={user?.avatar} size={96} />
            <Text style={styles.changePhotoText}>Changer la photo</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Prénom"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            <Input
              label="Nom"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
            <Input
              label="Bio"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={3}
              placeholder="Parle-nous de toi..."
            />
          </View>

          <View style={styles.buttonSection}>
            <Button onPress={handleSave} fullWidth size="lg">
              Enregistrer
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.xxl,
  },
  avatarSection: {
    alignItems: 'center',
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxl,
  },
  changePhotoText: {
    ...typography.bodySmall,
    color: colors.brand.orange,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  form: {
    gap: spacing.lg,
  },
  buttonSection: {
    marginTop: spacing.xxxl,
    paddingBottom: spacing.xxl,
  },
});
