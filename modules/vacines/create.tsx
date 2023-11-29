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
  const { user, isLoading } = useGetAuthAction();
  const userId = user?.uid;

  const onSubmit = React.useCallback(
    async (values: VacineFormType, form: VacineFormMethod) => {
      const vacine = await getSubmitData(values, userId!);

      const id = nanoid();

      const result = await firestore()
        .doc(`vacines/${id}`)
        .set({ ...vacine, id });

      queryClient.refetchQueries({ queryKey: vacineKey.list() });

      Toast.success('Data Berhasil Disimpan');
      router.back();
      return result;
    },
    [userId],
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
