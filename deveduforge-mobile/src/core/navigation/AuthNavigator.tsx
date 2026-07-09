import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './navigation.types';
import OnboardingScreen from '../../modules/auth/screens/OnboardingScreen';
import LoginScreen from '../../modules/auth/screens/LoginScreen';
import RegisterScreen from '../../modules/auth/screens/RegisterScreen';
import ForgotPasswordScreen from '../../modules/auth/screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../../modules/auth/screens/ResetPasswordScreen';
import VerifyEmailScreen from '../../modules/auth/screens/VerifyEmailScreen';
import BiometricSetupScreen from '../../modules/auth/screens/BiometricSetupScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const screens: {
  name: keyof AuthStackParamList;
  component: React.ComponentType<any>;
}[] = [
  { name: 'Onboarding', component: OnboardingScreen },
  { name: 'Login', component: LoginScreen },
  { name: 'Register', component: RegisterScreen },
  { name: 'ForgotPassword', component: ForgotPasswordScreen },
  { name: 'ResetPassword', component: ResetPasswordScreen },
  { name: 'VerifyEmail', component: VerifyEmailScreen },
  { name: 'BiometricSetup', component: BiometricSetupScreen },
];

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
}
