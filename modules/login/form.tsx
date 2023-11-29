import React from 'react';
import { LoginFormSchema, LoginFormType } from './form-type';
import useYupValidationResolver from '../../hooks/use-yup-validation-resolver';
import { useForm } from 'react-hook-form';
import Form from '../../components/form/form';

import { Button, Text } from 'react-native-paper';
import TextInput from '../../components/element/text-input';

import { View } from '../../components/themed';

import { Link } from 'expo-router';
import useGetAuthAction from '../../hooks/use-get-auth-action';

interface Props {}

export default function LoginForm(props: Props) {
  const { onLogin } = useGetAuthAction();
  const defaultValues = React.useMemo<LoginFormType>(() => {
    return {
      email: '',
      password: '',
    };
  }, []);
  const resolver = useYupValidationResolver(LoginFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: LoginFormType) => {
      await onLogin(values);
    },
    [onLogin],
  );

  return (
    <View
      style={{
        marginHorizontal: 16,
        flex: 1,
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <Form methods={methods}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <Text variant="displaySmall">Adorabbit</Text>
          <Text variant="headlineMedium">Login</Text>
        </View>

        <TextInput name="email" label="Email" />

        <TextInput name="password" type="password" label="Password" />

        <Button
          mode="contained"
          onPress={methods.handleSubmit(onSubmit as any)}
          loading={methods.formState.isSubmitting}
        >
          Login
        </Button>
        <Link href="/register" asChild>
          <Button>Register</Button>
        </Link>
      </Form>
    </View>
  );
}
