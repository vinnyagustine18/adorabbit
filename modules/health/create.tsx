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
  const { user, isLoading } = useGetAuthAction();
  const userId = user?.id;

  const onSubmit = React.useCallback(
    async (values: HealthFormType, form: HealthFormMethod) => {
      const health = await getSubmitData(values, userId!);

      const id = nanoid();

      const result = await firestore()
        .doc(`healths/${id}`)
        .set({ ...health, id });

      queryClient.refetchQueries({ queryKey: healthKey.list() });

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
        <HealthForm onSubmit={onSubmit} />
      )}
    </Container>
  );
}
