import React, { Component, ErrorInfo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { colors } from '../../../constants/colors';
import { typography } from '../../../constants/typography';
import { spacing } from '../../../constants/spacing';
import { radius } from '../../../constants/radius';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <AlertTriangle size={48} color={colors.semantic.error} />
          <Text style={styles.title}>Une erreur est survenue</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'Quelque chose s\'est mal passé.'}
          </Text>
          <Pressable
            style={styles.button}
            onPress={this.handleRetry}
            role="button"
            accessibilityLabel="Réessayer"
          >
            <Text style={styles.buttonText}>Réessayer</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.neutral.surface,
  },
  title: {
    ...typography.h2,
    color: colors.neutral.text,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  message: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  button: {
    backgroundColor: colors.brand.orange,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  buttonText: {
    ...typography.button,
    color: colors.neutral.surface,
  },
});
