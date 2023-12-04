import React from 'react';

import { MateFormMethod, MateFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import { router } from 'expo-router';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';

import { nanoid } from 'nanoid';

import { Text } from 'react-native-paper';
import { queryClient } from '../../constants/query-client';
import MateForm from './components/form';
import { mateKey } from '../../api-hook/mate/query';
import { getSubmitData } from './utils';

export default function MateCreate() {
  const { user, isLoading } = useGetAuthAction();
  const userId = user?.id;

  const onSubmit = React.useCallback(
    async (values: MateFormType, form: MateFormMethod) => {
      const mate = await getSubmitData(values, userId!);

      const id = nanoid();

      const result = await firestore()
        .doc(`mates/${id}`)
        .set({ ...mate, id });

      queryClient.refetchQueries({ queryKey: mateKey.list() });

      Toast.success('Data Berhasil Disimpan');
      router.back();
      return result;
    },
    [userId],
  );

  return (
    <Container>
      {isLoading ? <Text>Loading ...</Text> : <MateForm onSubmit={onSubmit} />}
    </Container>
  );
}
