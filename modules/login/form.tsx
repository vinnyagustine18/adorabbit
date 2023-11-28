import React from 'react';
import { LoginFormSchema, LoginFormType } from './form-type';
import useYupValidationResolver from '../../hooks/use-yup-validation-resolver';
import { useForm } from 'react-hook-form';
import Form from '../../components/form/form';

import { Button } from 'react-native-paper';
import TextInput from '../../components/element/text-input';

import { Text, View } from '../../components/themed';
import Container from '../../components/container';
import { Link } from 'expo-router';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { ScrollView } from 'react-native';

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
    <Container
      style={{
        justifyContent: 'center',
      }}
    >
      <ScrollView>
        <Form methods={methods}>
          <Text
            style={{ textAlign: 'center', fontSize: 24, fontWeight: '600' }}
          >
            Adorabbit
          </Text>
          <Text
            style={{ textAlign: 'center', fontSize: 24, fontWeight: '600' }}
          >
            Login
          </Text>

          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <TextInput name="email" label="Email" />

            <TextInput name="password" type="password" label="Password" />

            <Button
              onPress={methods.handleSubmit(onSubmit as any)}
              loading={methods.formState.isSubmitting}
            >
              Login
            </Button>
            <Link href="/register" asChild>
              <Button>Register</Button>
            </Link>
          </View>
        </Form>
      </ScrollView>
    </Container>
  );
}
