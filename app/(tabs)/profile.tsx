import LoginForm from '../../modules/login/form';
import Container from '../../components/container';
import React from 'react';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import Profile from '../../modules/profil/profil';

export default function TabTwoScreen() {
  const { user } = useGetAuthAction();

  if (user) {
    return <Profile />;
  }
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}
