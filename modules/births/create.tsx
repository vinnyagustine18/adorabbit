import React from 'react';
import { BirthFormMethod, BirthFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import { router } from 'expo-router';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';

import { nanoid } from 'nanoid';

import { Text } from 'react-native-paper';

import { queryClient } from '../../constants/query-client';

import BirthForm from './components/form';
import { birthKey } from '../../api-hook/birth/query';

export default function BirthCreate() {
  const { user: currentUser, isLoading } = useGetAuthAction();

  const onSubmit = React.useCallback(
    async (values: BirthFormType, form: BirthFormMethod) => {
      const { mateId, rabbitId, ...rest } = values;

      const { password, ...user } = currentUser!;

      const rabbit = (
        await firestore().doc(`rabbits/${rabbitId}`).get()
      ).data();
      const mate = (await firestore().doc(`mates/${mateId}`).get()).data();

      const id = nanoid();

      const result = await firestore()
        .doc(`births/${id}`)
        .set({ ...rest, user, rabbit, mate, id });

      queryClient.refetchQueries({ queryKey: birthKey.list() });

      Toast.success('Data Berhasil Disimpan');
      router.back();
      return result;
    },
    [currentUser],
  );

  return (
    <Container>
      {isLoading ? <Text>Loading ...</Text> : <BirthForm onSubmit={onSubmit} />}
    </Container>
  );
}
