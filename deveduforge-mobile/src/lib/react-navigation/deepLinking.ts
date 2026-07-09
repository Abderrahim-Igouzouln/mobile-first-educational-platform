import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '../../core/navigation/navigation.types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['deveduforge://'],
  config: {
    screens: {
      Auth: {
        screens: {
          ResetPassword: 'reset-password',
        },
      },
      Main: {
        screens: {
          CoursesTab: {
            screens: {
              CourseScreen: 'course/:technologySlug',
            },
          },
          CertificationsTab: {
            screens: {
              CertificateViewScreen: 'verify/:certificateNumber',
            },
          },
          ProfileTab: {
            screens: {
              SubscriptionScreen: 'subscription',
            },
          },
        },
      },
    },
  },
};
