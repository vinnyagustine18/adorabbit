import LoginForm from "../../modules/login/form";
import Container from "../../components/container";
import auth from "@react-native-firebase/auth";
import { Button } from "@ant-design/react-native";
import React from "react";
import Toast from "../../components/toast";
import useGetAuthAction from "../../hooks/use-get-auth-action";

export default function TabTwoScreen() {
  const { isLoading, user, onCreateUser, onLogin, onSignOut } =
    useGetAuthAction();

  if (user) {
    return <Button onPress={onSignOut}>Logout</Button>;
  }
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}
