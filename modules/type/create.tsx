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

import { queryClient } from '../../constants/query-client';
import { typeKey } from '../../api-hook/type/query';

export default function TypeCreate() {
  const { user: currentUser, isLoading } = useGetAuthAction();

  const onSubmit = React.useCallback(
    async (values: TypeFormType, form: TypeFormMethod) => {
      const { password, ...user } = currentUser!;

      const id = nanoid();

      const result = await firestore()
        .doc(`types/${id}`)
        .set({ ...values, user, id });

      queryClient.refetchQueries({ queryKey: typeKey.list() });

      Toast.success('Data Berhasil Disimpan');
      router.back();
      return result;
    },
    [currentUser],
  );

  return (
    <Container>
      {isLoading ? <Text>Loading ...</Text> : <TypeForm onSubmit={onSubmit} />}
    </Container>
  );
}
