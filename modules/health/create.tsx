import React from 'react';

import { HealthFormMethod, HealthFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import { router } from 'expo-router';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';

import { nanoid } from 'nanoid';

import { Text } from 'react-native-paper';

import { queryClient } from '../../constants/query-client';

import HealthForm from './components/form';
import { healthKey } from '../../api-hook/health/query';
import { getSubmitData } from './utils';

export default function HealthCreate() {
  const { user: currentUser, isLoading } = useGetAuthAction();

  const onSubmit = React.useCallback(
    async (values: HealthFormType, form: HealthFormMethod) => {
      const health = await getSubmitData(values);
      const { password, ...user } = currentUser!;

      const id = nanoid();

      const result = await firestore()
        .doc(`healths/${id}`)
        .set({ ...health, id, user });

      queryClient.refetchQueries({ queryKey: healthKey.list() });

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
        <HealthForm onSubmit={onSubmit} />
      )}
    </Container>
  );
}
