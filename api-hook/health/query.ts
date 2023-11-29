import firestore from '@react-native-firebase/firestore';
import { HealthModel } from './model';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const collection = 'health';

const healthKey = {
  listKey: 'healths',
  detailKey: 'health',
  list: () => [healthKey.listKey],
  detail: (id: string) => [healthKey.detailKey, id],
};

export function useGetDrugs(options?: UseQueryOptions<HealthModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? healthKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const users: HealthModel[] = [];

      result.forEach((result) => {
        const user = result.data() as HealthModel;
        users.push({ ...user, id: result.id });
      });

      return users;
    },
    ...options,
  });
}

export function useGetDrug(id: string, options?: UseQueryOptions<HealthModel>) {
  return useQuery({
    queryKey: options?.queryKey ?? healthKey.detail(id),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      return { ...(result.data() as HealthModel), id: result.id };
    },
    ...options,
  });
}
