import { useController, useFormContext } from 'react-hook-form';
import { useFormState } from '../form/form';

import { View } from '../themed';
import {
  TextInput as TextField,
  TextInputProps as TextFieldProps,
} from 'react-native-paper';
import { HelperText } from 'react-native-paper';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export interface TextInputProps extends TextFieldProps {
  name: string;
  type?: 'default' | 'password';
}

export default function TextInput(props: TextInputProps) {
  const {
    name,
    disabled,
    type = 'default',
    secureTextEntry = props.type === 'password',
    ...rest
  } = props;
  const [isPassword, setIsPassword] = React.useState(secureTextEntry);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { editable } = useFormState();
  const _disabled = !editable || disabled;

  return (
    <View>
      <TextField
        {...rest}
        secureTextEntry={isPassword}
        right={
          type === 'password' && (
            <TextField.Icon
              icon={() => (
                <FontAwesome
                  name={isPassword ? 'eye' : 'eye-slash'}
                  size={20}
                />
              )}
              onPress={() => setIsPassword((prev) => !prev)}
            />
          )
        }
        value={
          typeof field.value === 'string'
            ? field.value
            : field.value?.toString()
        }
        onChangeText={(value) => {
          field.onChange(value);
        }}
        disabled={_disabled}
      />
      <HelperText type="error" visible={!!fieldState.error?.message}>
        {fieldState.error?.message}
      </HelperText>
    </View>
  );
}
