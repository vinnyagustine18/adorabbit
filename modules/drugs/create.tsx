import React from 'react';

import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import { router } from 'expo-router';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';

import { nanoid } from 'nanoid';

import { Text } from 'react-native-paper';
import { queryClient } from '../../constants/query-client';

import { DrugFormMethod, DrugFormType } from './components/form-type';
import DrugForm from './components/form';
import { drugKey } from '../../api-hook/drug/query';

export default function DrugCreate() {
  const { user: currentUser, isLoading } = useGetAuthAction();

  const onSubmit = React.useCallback(
    async (values: DrugFormType, form: DrugFormMethod) => {
      const { password, ...user } = currentUser!;

      const id = nanoid();

      const result = await firestore()
        .doc(`drugs/${id}`)
        .set({ ...values, user, id });

      queryClient.refetchQueries({ queryKey: drugKey.list() });

      Toast.success('Data Berhasil Disimpan');
      router.back();
      return result;
    },
    [currentUser],
  );

  return (
    <Container>
      {isLoading ? (
        <Text>Loading ...</Text>
      ) : (
        <DrugForm user={currentUser} onSubmit={onSubmit} />
      )}
    </Container>
  );
}
