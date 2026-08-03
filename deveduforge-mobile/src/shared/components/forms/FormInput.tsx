import React from 'react';
import { TextInputProps as RNTextInputProps } from 'react-native';
import { useController, UseControllerProps, FieldValues } from 'react-hook-form';
import { LucideIcon } from 'lucide-react-native';
import { Input } from '../ui/input/Input';

interface FormInputProps<T extends FieldValues = FieldValues>
  extends Omit<UseControllerProps<T>, 'render'> {
  label?: string;
  secureTextEntry?: boolean;
  leftIcon?: LucideIcon;
  keyboardType?: RNTextInputProps['keyboardType'];
  autoCapitalize?: RNTextInputProps['autoCapitalize'];
  autoComplete?: RNTextInputProps['autoComplete'];
  placeholder?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  secureTextEntry,
  leftIcon,
  keyboardType,
  autoCapitalize,
  autoComplete,
  placeholder,
}: FormInputProps<T>) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <Input
      label={label}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      leftIcon={leftIcon}
      error={error?.message}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      placeholder={placeholder}
    />
  );
}
