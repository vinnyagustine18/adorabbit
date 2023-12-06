import { router, useLocalSearchParams } from 'expo-router';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { mateKey, useGetMate } from '../../api-hook/mate/query';
import { queryClient } from '../../constants/query-client';
import firestore from '@react-native-firebase/firestore';
import { MateFormMethod, MateFormType } from './components/form-type';
import React from 'react';
import Toast from '../../components/toast';
import Container from '../../components/container';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { ActivityIndicator } from 'react-native-paper';
import MateForm from './components/form';
import { getSubmitData } from './utils';

export default function MateShow() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const { user: currentUser, isLoading } = useGetAuthAction();

  const query = useGetMate(id);
  const mate = query.data;

  const onSubmit = React.useCallback(
    async (values: MateFormType, form: MateFormMethod) => {
      const mate = await getSubmitData(values);

      const { password, ...user } = currentUser!;

      const result = await firestore()
        .collection('mates')
        .doc(id)
        .update({ ...mate, user });

      queryClient.refetchQueries({ queryKey: mateKey.list() });
      queryClient.refetchQueries({ queryKey: mateKey.detail(id) });

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
        component={<MateForm mate={mate} onSubmit={onSubmit} />}
      />
    </Container>
  );
}
