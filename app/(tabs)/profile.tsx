import LoginForm from "../../modules/login/form";
import Container from "../../components/container";
import auth from "@react-native-firebase/auth";
import React from "react";
import Toast from "../../components/toast";
import useGetAuthAction from "../../hooks/use-get-auth-action";
import Profile from "../../modules/profil/profil";

export default function TabTwoScreen() {
  const { user, onSignOut } = useGetAuthAction();

  if (user) {
    return <Profile />;
  }
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}
