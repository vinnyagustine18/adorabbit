import React from 'react';
import TypeForm from './components/form';
import { TypeFormMethod, TypeFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import { router } from 'expo-router';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';

import { nanoid } from 'nanoid';

import { Text } from 'react-native-paper';
import { UserModel } from '../../api-hook/user/model';

export default function TypeCreate() {
  const { user, isLoading } = useGetAuthAction();
  const userId = user?.uid;

  const onSubmit = React.useCallback(
    async (values: TypeFormType, form: TypeFormMethod) => {
      const { password, ...user } = (
        await firestore().doc(`users/${userId}`).get()
      ).data() as UserModel;

      const id = nanoid();

      const result = await firestore()
        .doc(`types/${id}`)
        .set({ ...values, user, id });

      Toast.success('Data Berhasil Disimpan');
      router.back();
      return result;
    },
    [userId],
  );

  return (
    <Container>
      {isLoading ? <Text>Loading ...</Text> : <TypeForm onSubmit={onSubmit} />}
    </Container>
  );
}
