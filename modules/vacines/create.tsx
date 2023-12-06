import React from 'react';

import { VacineFormMethod, VacineFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import { router } from 'expo-router';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';

import { nanoid } from 'nanoid';

import { Text } from 'react-native-paper';
import { queryClient } from '../../constants/query-client';

import { getSubmitData } from './utils';
import { vacineKey } from '../../api-hook/vacine/query';
import VacineForm from './components/form';

export default function VacineCreate() {
  const { user: currentUser, isLoading } = useGetAuthAction();

  const onSubmit = React.useCallback(
    async (values: VacineFormType, form: VacineFormMethod) => {
      const vacine = await getSubmitData(values);

      const { password, ...user } = currentUser!;
      const id = nanoid();

      const result = await firestore()
        .doc(`vacines/${id}`)
        .set({ ...vacine, id, user });

      queryClient.refetchQueries({ queryKey: vacineKey.list() });

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
        <VacineForm onSubmit={onSubmit} />
      )}
    </Container>
  );
}
