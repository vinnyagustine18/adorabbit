import { router, useLocalSearchParams } from 'expo-router';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { ActivityIndicator } from 'react-native-paper';
import React from 'react';
import { DrugFormMethod, DrugFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { queryClient } from '../../constants/query-client';
import DrugForm from './components/form';
import { drugKey, useGetDrug } from '../../api-hook/drug/query';

export default function DrugShow() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const { user: currentUser, isLoading } = useGetAuthAction();

  const query = useGetDrug(id);
  const drug = query.data;

  const onSubmit = React.useCallback(
    async (values: DrugFormType, form: DrugFormMethod) => {
      const { password, ...user } = currentUser!;

      const result = await firestore()
        .collection('drugs')
        .doc(id)
        .update({
          ...values,
          user,
        });

      queryClient.refetchQueries({ queryKey: drugKey.list() });
      queryClient.refetchQueries({ queryKey: drugKey.detail(id) });

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
        component={<DrugForm drug={drug} onSubmit={onSubmit} />}
      />
    </Container>
  );
}
