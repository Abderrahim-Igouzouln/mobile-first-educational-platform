import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const tokenize = (line: string): { text: string; color: string }[] => {
  const tokens: { text: string; color: string }[] = [];
  const regex = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:import|export|from|const|let|var|function|return|if|else|for|while|class|extends|async|await|try|catch|throw|new|this|super|typeof|instanceof|in|of|switch|case|break|continue|default|interface|type|extends|implements|enum|namespace|module|declare|public|private|protected|readonly|static|abstract)\b|\b(?:string|number|boolean|void|never|any|unknown|null|undefined|Record|Partial|Required|Pick|Omit|Promise|Array|Map|Set)\b|(\d+\.?\d*)|([+\-*/=<>!&|^~%?:;,.{}[\]()@#]))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        text: line.slice(lastIndex, match.index),
        color: colors.dark.text,
      });
    }

    const token = match[0];
    if (/^\/\*[\s\S]*?\*\/|\/\/[^\n]*$/.test(token)) {
      tokens.push({ text: token, color: '#6A9955' });
    } else if (/^["'`]/.test(token)) {
      tokens.push({ text: token, color: '#CE9178' });
    } else if (/^(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|async|await|try|catch|throw|new|this|super|typeof|instanceof|of|in|switch|case|break|continue|default|interface|type|implements|enum|namespace|module|declare|public|private|protected|readonly|static|abstract)$/.test(token)) {
      tokens.push({ text: token, color: '#569CD6' });
    } else if (/^(string|number|boolean|void|never|any|unknown|null|undefined|Record|Partial|Required|Pick|Omit|Promise|Array|Map|Set)$/.test(token)) {
      tokens.push({ text: token, color: '#4EC9B0' });
    } else if (/^\d+\.?\d*$/.test(token)) {
      tokens.push({ text: token, color: '#B5CEA8' });
    } else {
      tokens.push({ text: token, color: colors.dark.text });
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < line.length) {
    tokens.push({
      text: line.slice(lastIndex),
      color: colors.dark.text,
    });
  }

  return tokens.length > 0 ? tokens : [{ text: line, color: colors.dark.text }];
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const lines = code.split('\n');

  return (
    <View style={styles.container}>
      {language && (
        <View style={styles.header}>
          <Text style={styles.language}>{language}</Text>
          <Text style={styles.copyHint}>Copier</Text>
        </View>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.codeContainer}>
          {lines.map((line, lineIndex) => {
            const tokens = tokenize(line);
            return (
              <View key={lineIndex} style={styles.line}>
                <Text style={styles.lineNumber}>{lineIndex + 1}</Text>
                <Text style={styles.codeText}>
                  {tokens.map((token, tokenIndex) => (
                    <Text key={tokenIndex} style={{ color: token.color }}>
                      {token.text}
                    </Text>
                  ))}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.dark.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  language: {
    ...typography.bodySmall,
    color: colors.dark.textLight,
    fontFamily: 'SourceCodePro-Regular',
  },
  copyHint: {
    ...typography.bodySmall,
    color: colors.dark.textLight,
  },
  codeContainer: {
    padding: spacing.md,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  lineNumber: {
    ...typography.code,
    color: colors.dark.textLight,
    width: 32,
    textAlign: 'right',
    marginRight: spacing.md,
    opacity: 0.5,
  },
  codeText: {
    ...typography.code,
    color: colors.dark.text,
    flexShrink: 0,
  },
});
