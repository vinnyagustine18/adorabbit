import React from "react";
import { LoginFormSchema, LoginFormType } from "./form-type";
import useYupValidationResolver from "../../hooks/use-yup-validation-resolver";
import { useForm } from "react-hook-form";
import Form from "../../components/form";

import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { Button, WhiteSpace } from "@ant-design/react-native";
import TextInput from "../../components/element/text-input";

import { Text, View } from "../../components/themed";
import Container from "../../components/container";
import { Link, router } from "expo-router";

interface Props {}

export default function LoginForm(props: Props) {
  const defaultValues = React.useMemo<LoginFormType>(() => {
    return {
      email: "vinnyagustineee18@gmail.com",
      password: "secret123",
    };
  }, []);
  const resolver = useYupValidationResolver(LoginFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async (values: LoginFormType) => {
    try {
      const result = await auth().signInWithEmailAndPassword(
        values.email,
        values.password
      );
      Toast.show({
        autoHide: true,
        type: "success",
        position: "top",
        text1: "Login Success",
      });

      router.replace("/(tabs)/");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }
      console.log(error);
    }
  }, []);

  return (
    <Container
      style={{
        justifyContent: "center",
      }}
    >
      <Form methods={methods}>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "600" }}>
          Login Adorabbit
        </Text>
        <WhiteSpace size="xl" />
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <TextInput clear name="email" type="email-address" label="Email" />
          <WhiteSpace size="lg" />
          <TextInput clear name="password" type="password" label="Password" />
          <WhiteSpace size="md" />
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
      </Form>
    </Container>
  );
}
