import { router, useLocalSearchParams } from 'expo-router';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { ActivityIndicator } from 'react-native-paper';
import React from 'react';
import { BirthFormMethod, BirthFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { queryClient } from '../../constants/query-client';

import { birthKey, useGetBirth } from '../../api-hook/birth/query';
import BirthForm from './components/form';

export default function BirthShow() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const { user: currentUser, isLoading } = useGetAuthAction();
  // const userId = user?.id;

  const query = useGetBirth(id);
  const birth = query.data;

  const onSubmit = React.useCallback(
    async (values: BirthFormType, form: BirthFormMethod) => {
      const { mateId, rabbitId, ...rest } = values;

      const { password, ...user } = currentUser!;

      const rabbit = (
        await firestore().doc(`rabbits/${rabbitId}`).get()
      ).data();
      const mate = (await firestore().doc(`mates/${mateId}`).get()).data();

      const result = await firestore()
        .collection('births')
        .doc(id)
        .update({
          ...rest,
          user,
          rabbit,
          mate,
        });

      queryClient.refetchQueries({ queryKey: birthKey.list() });
      queryClient.refetchQueries({ queryKey: birthKey.detail(id) });

      Toast.success('Data Berhasil diubah');
      router.back();

      return result;
    },
    [currentUser, id],
  );

  return (
    <Container>
      <FetchWrapperComponent
        onRetry={query.refetch}
        error={query.error?.message}
        isLoading={query.isFetching || isLoading}
        loadingComponent={<ActivityIndicator />}
        component={<BirthForm birth={birth} onSubmit={onSubmit} />}
      />
    </Container>
  );
}
