import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Cloud, RefreshCw, WifiOff } from 'lucide-react-native';
import { useNetworkStatus } from '../../../core/hooks/useNetworkStatus';
import { colors } from '../../constants/colors';

interface OfflineIndicatorProps {
  size?: number;
}

const ICON_CONFIG = {
  synced: { Icon: Cloud, color: colors.semantic.success },
  syncing: { Icon: RefreshCw, color: colors.brand.navy },
  offline: { Icon: WifiOff, color: colors.semantic.error },
} as const;

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ size = 20 }) => {
  const { isConnected } = useNetworkStatus();
  const status = isConnected ? 'synced' : 'offline';
  const config = ICON_CONFIG[status];
  const IconComponent = config.Icon;

  return (
    <View
      style={styles.container}
      role="img"
      accessibilityLabel={`Sync status: ${status}`}
    >
      <IconComponent size={size} color={config.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
