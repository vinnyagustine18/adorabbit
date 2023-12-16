import { router, useLocalSearchParams } from 'expo-router';
import { typeKey, useGetType } from '../../api-hook/type/query';
import TypeForm from './components/form';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { ActivityIndicator } from 'react-native-paper';
import React from 'react';
import { TypeFormMethod, TypeFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import Container from '../../components/container';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { queryClient } from '../../constants/query-client';

export default function TypeShow() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const { user: currentUser, isLoading } = useGetAuthAction();

  const query = useGetType(id);
  const type = query.data;

  const onSubmit = React.useCallback(
    async (values: TypeFormType, form: TypeFormMethod) => {
      const { password, ...user } = currentUser!;

      const result = await firestore()
        .collection('types')
        .doc(id)
        .update({
          ...values,
          user,
        });

      queryClient.refetchQueries({ queryKey: typeKey.list() });
      queryClient.refetchQueries({ queryKey: typeKey.detail(id) });

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
        component={
          <TypeForm user={currentUser} type={type} onSubmit={onSubmit} />
        }
      />
    </Container>
  );
}
