import { router, useLocalSearchParams } from 'expo-router';
import useGetAuthAction from '../../hooks/use-get-auth-action';

import { queryClient } from '../../constants/query-client';
import firestore from '@react-native-firebase/firestore';
import { VacineFormMethod, VacineFormType } from './components/form-type';
import React from 'react';
import Toast from '../../components/toast';
import Container from '../../components/container';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { ActivityIndicator } from 'react-native-paper';
import VacineForm from './components/form';
import { getSubmitData } from './utils';
import { useGetVacine, vacineKey } from '../../api-hook/vacine/query';

export default function VacineShow() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const { user, isLoading } = useGetAuthAction();
  const userId = user?.id;
  const query = useGetVacine(id);
  const vacine = query.data;

  const onSubmit = React.useCallback(
    async (values: VacineFormType, form: VacineFormMethod) => {
      const vacine = await getSubmitData(values, userId!);

      const result = await firestore()
        .collection('vacines')
        .doc(id)
        .update(vacine);

      queryClient.refetchQueries({ queryKey: vacineKey.list() });
      queryClient.refetchQueries({ queryKey: vacineKey.detail(id) });

      Toast.success('Data Berhasil diubah');
      router.back();

      return result;
    },
    [id, userId],
  );
  return (
    <Container>
      <FetchWrapperComponent
        onRetry={query.refetch}
        error={query.error?.message}
        isLoading={query.isFetching || isLoading}
        loadingComponent={<ActivityIndicator />}
        component={<VacineForm vacine={vacine} onSubmit={onSubmit} />}
      />
    </Container>
  );
}
