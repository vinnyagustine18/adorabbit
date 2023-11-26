import React from "react";
import { LoginFormSchema, LoginFormType } from "./form-type";
import useYupValidationResolver from "../../hooks/use-yup-validation-resolver";
import { useForm } from "react-hook-form";
import Form from "../../components/form/form";

import auth from "@react-native-firebase/auth";

import { Button, WhiteSpace } from "@ant-design/react-native";
import TextInput from "../../components/element/text-input";

import { Text, View } from "../../components/themed";
import Container from "../../components/container";
import { Link, router } from "expo-router";
import Toast from "../../components/toast";
import useGetAuthAction from "../../hooks/use-get-auth-action";
import Select from "../../components/element/select-input";
import { ScrollView } from "react-native";

interface Props {}

export default function LoginForm(props: Props) {
  const { onLogin } = useGetAuthAction();
  const defaultValues = React.useMemo<LoginFormType>(() => {
    return {
      email: "",
      password: "",
    };
  }, []);
  const resolver = useYupValidationResolver(LoginFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async (values: LoginFormType) => {
    await onLogin(values);
  }, []);

  return (
    <Container
      style={{
        justifyContent: "center",
      }}
    >
      <ScrollView>
        <Form methods={methods}>
          <Text
            style={{ textAlign: "center", fontSize: 24, fontWeight: "600" }}
          >
            Adorabbit
          </Text>
          <WhiteSpace size="xl" />
          <Text
            style={{ textAlign: "center", fontSize: 24, fontWeight: "600" }}
          >
            Login
          </Text>
          <WhiteSpace size="xl" />
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <TextInput clear name="email" type="email-address" label="Email" />
            <WhiteSpace size="xl" />
            <TextInput clear name="password" type="password" label="Password" />
            <WhiteSpace size="xl" />
            <Button
              onPress={methods.handleSubmit(onSubmit as any)}
              loading={methods.formState.isSubmitting}
              type="primary"
            >
              Login
            </Button>
            <WhiteSpace size="lg" />
            <Link href="/register" asChild>
              <Button type="ghost">Register</Button>
            </Link>
          </View>
          <WhiteSpace size="xl" />
        </Form>
      </ScrollView>
    </Container>
  );
}
