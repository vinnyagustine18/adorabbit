import useGetAuthAction from '../../hooks/use-get-auth-action';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import {
  TransactionFormMethod,
  TransactionFormType,
} from './components/form-type';
import React from 'react';
import TransactionForm from './components/form';
import { useGetRabbits } from '../../api-hook/rabbit/query';
import Container from '../../components/container';
import firestore from '@react-native-firebase/firestore';
import { queryClient } from '../../constants/query-client';
import { transactionKey } from '../../api-hook/transaction/query';
import Toast from '../../components/toast';
import { router } from 'expo-router';
import { nanoid } from 'nanoid';

export default function TransactionCreate() {
  const { user: currentUser, isLoading } = useGetAuthAction();

  const query = useGetRabbits();

  const rabbits = (query.data ?? []).filter(
    (data) => data.user.id === currentUser?.id,
  );

  const onSubmit = React.useCallback(
    async (values: TransactionFormType, form: TransactionFormMethod) => {
      const { password, ...user } = currentUser!;
      const createBy = user;
      const seller = user;
      const {
        isSales,
        paymentAmount,
        paymentAt,
        paymentType,
        products: currentProducts,
        ...rest
      } = values;
      const id = nanoid();

      const products = currentProducts
        .filter((prod) => prod.isCheck)
        .map((prod) => {
          const { isCheck, ...product } = prod;
          return product;
        });

      const result = await firestore()
        .doc(`transactions/${id}`)
        .set({ ...rest, products, createBy, seller, id });

      queryClient.refetchQueries({ queryKey: transactionKey.list() });

      Toast.success('Data Berhasil diubah');
      router.back();

      return result;
    },
    [currentUser],
  );
  return (
    <Container>
      <FetchWrapperComponent
        error={query.error?.message}
        isLoading={query.isFetching || isLoading}
        onRetry={query.refetch}
        component={
          <TransactionForm
            user={currentUser!}
            rabbits={rabbits}
            onSubmit={onSubmit}
          />
        }
      />
    </Container>
  );
}
