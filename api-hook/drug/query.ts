import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { DrugModel } from './model';
import firestore from '@react-native-firebase/firestore';

const collection = 'drugs';

export const drugKey = {
  listKey: 'drugs',
  detailKey: 'drug',
  list: () => [drugKey.listKey],
  detail: (id: string) => [drugKey.detailKey, id],
};

export function useGetDrugs(options?: UseQueryOptions<DrugModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? drugKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const drugs: DrugModel[] = [];

      result.forEach((result) => {
        const drug = result.data() as DrugModel;
        drugs.push({ ...drug, key: result.id });
      });

      return drugs;
    },
    ...options,
  });
}

export function useGetDrug(id: string, options?: UseQueryOptions<DrugModel>) {
  return useQuery({
    queryKey: options?.queryKey ?? drugKey.detail(id),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      return { ...(result.data() as DrugModel), key: result.id };
    },
    ...options,
  });
}
