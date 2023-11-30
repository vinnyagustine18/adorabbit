import firestore from '@react-native-firebase/firestore';
import { HealthModel } from './model';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const collection = 'healths';

export const healthKey = {
  listKey: 'healths',
  detailKey: 'health',
  list: () => [healthKey.listKey],
  detail: (id: string) => [healthKey.detailKey, id],
};

export function useGetHealths(options?: UseQueryOptions<HealthModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? healthKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const healths: HealthModel[] = [];

      result.forEach((result) => {
        const health = result.data() as any;
        healths.push({
          ...health,
          checkAt: health.checkAt.toDate(),
          key: result.id,
        });
      });

      return healths;
    },
    ...options,
  });
}

export function useGetHealth(
  id: string,
  options?: UseQueryOptions<HealthModel>,
) {
  return useQuery({
    queryKey: options?.queryKey ?? healthKey.detail(id),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      const health = result.data() as any;
      return { ...health, checkAt: health.checkAt.toDate(), key: result.id };
    },
    ...options,
  });
}
