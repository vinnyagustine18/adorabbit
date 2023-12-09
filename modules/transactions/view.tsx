import { router, useLocalSearchParams } from 'expo-router';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import {
  transactionKey,
  useGetTransaction,
} from '../../api-hook/transaction/query';
import TransactionForm from './components/form';
import React from 'react';
import {
  TransactionFormMethod,
  TransactionFormType,
} from './components/form-type';

import useGetAuthAction from '../../hooks/use-get-auth-action';
import { useGetRabbits } from '../../api-hook/rabbit/query';
import firestore from '@react-native-firebase/firestore';
import Toast from '../../components/toast';
import { queryClient } from '../../constants/query-client';
import Container from '../../components/container';

export default function TransactionView() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const { user: currentUser, isLoading } = useGetAuthAction();

  const query = useGetTransaction(id!);
  const transaction = query.data;

  const queryRabbit = useGetRabbits();
  const rabbits = queryRabbit.data ?? [];

  const onSubmit = React.useCallback(
    async (values: TransactionFormType, form: TransactionFormMethod) => {
      const {
        isSales,
        paymentAmount,
        paymentAt,
        paymentType,
        products: currentProducts,
        ...rest
      } = values;

      const products = currentProducts
        .filter((prod) => prod.isCheck)
        .map((prod) => {
          const { isCheck, ...product } = prod;
          return product;
        });

      const transaction = isSales
        ? {
            paymentAmount,
            paymentAt,
            paymentType,
            products,
            ...rest,
          }
        : {
            products,
            ...rest,
          };

      const result = await firestore()
        .doc(`transactions/${id}`)
        .update(transaction);

      queryClient.refetchQueries({ queryKey: transactionKey.list() });
      queryClient.refetchQueries({ queryKey: transactionKey.detail(id) });

      Toast.success('Data Berhasil diubah');
      router.back();

      return result;
    },
    [id],
  );

  return (
    <Container>
      <FetchWrapperComponent
        error={query.error?.message ?? queryRabbit?.error?.message}
        isLoading={query.isFetching || isLoading || queryRabbit.isFetching}
        onRetry={query.refetch}
        component={
          <TransactionForm
            user={currentUser!}
            rabbits={rabbits}
            transaction={transaction}
            onSubmit={onSubmit}
          />
        }
      />
    </Container>
  );
}
