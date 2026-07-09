import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { CodeBlock } from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const processContent = (text: string): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(
          <Markdown key={`md-${lastIndex}`} style={markdownStyles}>
            {text.slice(lastIndex, match.index)}
          </Markdown>,
        );
      }

      const language = match[1] || '';
      const code = match[2].trim();
      nodes.push(<CodeBlock key={`code-${match.index}`} code={code} language={language} />);
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      nodes.push(
        <Markdown key={`md-${lastIndex}`} style={markdownStyles}>
          {text.slice(lastIndex)}
        </Markdown>,
      );
    }

    return nodes;
  };

  return <View style={styles.container}>{processContent(content)}</View>;
};

const markdownStyles = StyleSheet.create({
  body: {
    ...typography.bodyLarge,
    color: colors.neutral.text,
  },
  heading1: {
    ...typography.display,
    color: colors.neutral.text,
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  heading2: {
    ...typography.h1,
    color: colors.neutral.text,
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  heading3: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  heading4: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  paragraph: {
    ...typography.bodyLarge,
    color: colors.neutral.text,
    marginBottom: spacing.md,
    lineHeight: 26,
  },
  bullet_list: {
    marginBottom: spacing.md,
  },
  ordered_list: {
    marginBottom: spacing.md,
  },
  list_item: {
    ...typography.bodyLarge,
    color: colors.neutral.text,
    marginBottom: spacing.xs,
    lineHeight: 26,
  },
  code_inline: {
    backgroundColor: colors.neutral.surfaceAlt,
    color: colors.semantic.error,
    fontFamily: 'SourceCodePro-Regular',
    fontSize: 13,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
  },
  fence: {
    display: 'none',
  },
  blockquote: {
    backgroundColor: colors.semantic.infoBg,
    borderLeftWidth: 4,
    borderLeftColor: colors.semantic.info,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    borderRadius: radius.sm,
  },
  link: {
    color: colors.brand.orange,
    textDecorationLine: 'underline',
  },
  strong: {
    fontWeight: '700',
  },
  em: {
    fontStyle: 'italic',
  },
  image: {
    borderRadius: radius.md,
    marginVertical: spacing.md,
  },
  table: {
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: radius.sm,
    marginBottom: spacing.md,
  },
  thead: {
    backgroundColor: colors.neutral.surfaceAlt,
  },
  th: {
    padding: spacing.sm,
    ...typography.body,
    fontWeight: '700',
    color: colors.neutral.text,
  },
  td: {
    padding: spacing.sm,
    ...typography.body,
    color: colors.neutral.text,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  hr: {
    backgroundColor: colors.neutral.border,
    height: 1,
    marginVertical: spacing.xl,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
