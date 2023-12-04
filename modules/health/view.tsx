import { router, useLocalSearchParams } from 'expo-router';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { ActivityIndicator } from 'react-native-paper';
import React from 'react';
import { HealthFormMethod, HealthFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { queryClient } from '../../constants/query-client';
import HealthForm from './components/form';
import { healthKey, useGetHealth } from '../../api-hook/health/query';
import { getSubmitData } from './utils';

export default function HealthShow() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const { user, isLoading } = useGetAuthAction();
  const userId = user?.id;

  const query = useGetHealth(id);
  const health = query.data;

  const onSubmit = React.useCallback(
    async (values: HealthFormType, form: HealthFormMethod) => {
      const health = await getSubmitData(values, userId!);

      const result = await firestore()
        .collection('healths')
        .doc(id)
        .update(health);

      queryClient.refetchQueries({ queryKey: healthKey.list() });
      queryClient.refetchQueries({ queryKey: healthKey.detail(id) });

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
        component={<HealthForm health={health} onSubmit={onSubmit} />}
      />
    </Container>
  );
}
