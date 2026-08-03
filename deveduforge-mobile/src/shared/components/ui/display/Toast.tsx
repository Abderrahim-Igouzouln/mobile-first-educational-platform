import ToastMessage, { BaseToast, BaseToastProps, ToastConfigParams } from 'react-native-toast-message';
import { colors } from '../../../constants/colors';

type ToastType = 'success' | 'error' | 'info' | 'warning';

const DURATION_MAP: Record<ToastType, number> = {
  success: 3000,
  info: 3000,
  warning: 3000,
  error: 5000,
};

const BG_COLOR_MAP: Record<ToastType, string> = {
  success: colors.semantic.success,
  error: colors.semantic.error,
  info: colors.semantic.info,
  warning: colors.semantic.warning,
};

const showToast = (type: ToastType, title: string, message?: string) => {
  ToastMessage.show({
    type,
    text1: title,
    text2: message,
    visibilityTime: DURATION_MAP[type],
    position: 'top',
    onPress: () => ToastMessage.hide(),
    props: { backgroundColor: BG_COLOR_MAP[type] },
  });
};

export const Toast = {
  success: (title: string, message?: string) => showToast('success', title, message),
  error: (title: string, message?: string) => showToast('error', title, message),
  info: (title: string, message?: string) => showToast('info', title, message),
  warning: (title: string, message?: string) => showToast('warning', title, message),
  hide: () => ToastMessage.hide(),
};

export const toastConfig = {
  success: (params: ToastConfigParams<{ backgroundColor?: string }>) => {
    const { props: customProps, ...rest } = params;
    return (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: customProps?.backgroundColor ?? colors.semantic.success, borderLeftWidth: 0 }}
      />
    );
  },
};
