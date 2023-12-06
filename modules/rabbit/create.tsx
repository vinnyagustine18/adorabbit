import React from 'react';

import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import { router } from 'expo-router';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { RabbitFormMethod, RabbitFormType } from './components/form-type';
import { getSubmitData } from './utils';
import RabbitForm from './components/form';
import { nanoid } from 'nanoid';
import { Text } from 'react-native-paper';
import { rabbitKey } from '../../api-hook/rabbit/query';
import { queryClient } from '../../constants/query-client';

export default function RabbitCreate() {
  const { user: currentUser, isLoading } = useGetAuthAction();

  const onSubmit = React.useCallback(
    async (values: RabbitFormType, form: RabbitFormMethod) => {
      const rabbit = await getSubmitData(values);
      const id = nanoid(10);
      const { password, ...user } = currentUser!;

      const result = await firestore()
        .collection('rabbits')
        .doc(id)
        .set({ ...rabbit, id, user });

      queryClient.refetchQueries({ queryKey: rabbitKey.list() });

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
        <RabbitForm onSubmit={onSubmit} />
      )}
    </Container>
  );
}
