import firestore from '@react-native-firebase/firestore';
import { TransactionModel } from './model';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const collection = 'transactions';

export const transactionKey = {
  listKey: 'transactions',
  detailKey: 'transaction',
  list: () => [transactionKey.listKey],
  detail: (id: string) => [transactionKey.detailKey, id],
};

export function useGetTransactions(
  options?: UseQueryOptions<TransactionModel[]>,
) {
  return useQuery({
    queryKey: options?.queryKey ?? transactionKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const transactions: TransactionModel[] = [];

      result.forEach((result) => {
        const transaction = result.data() as any;

        transactions.push({
          ...transaction,
          paymentAt: transaction?.paymentAt
            ? transaction?.paymentAt?.toDate()
            : null,
          transactionAt: transaction?.transactionAt
            ? transaction?.transactionAt?.toDate()
            : null,
          key: result.id,
        });
      });

      return transactions;
    },
    ...options,
  });
}

export function useGetTransaction(
  id: string,
  options?: UseQueryOptions<TransactionModel>,
) {
  return useQuery({
    queryKey: options?.queryKey ?? transactionKey.detail(id),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      const transaction = result.data() as any;

      return {
        ...transaction,
        paymentAt: transaction?.paymentAt
          ? transaction.paymentAt?.toDate()
          : null,
        transactionAt: transaction?.transactionAt
          ? transaction?.transactionAt?.toDate()
          : null,
        key: result.id,
      };
    },
    ...options,
  });
}
