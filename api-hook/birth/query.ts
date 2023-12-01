import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { BirthModel } from './model';
import firestore from '@react-native-firebase/firestore';

const collection = 'births';

export const birthKey = {
  listKey: 'births',
  detailKey: 'birth',
  list: () => [birthKey.listKey],
  detail: (id: string) => [birthKey.detailKey, id],
};

export function useGetBirths(options?: UseQueryOptions<BirthModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? birthKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const births: BirthModel[] = [];

      result.forEach((result) => {
        const birth = result.data() as any;
        births.push({
          ...birth,
          birthAt: birth.birthAt.toDate(),
          key: result.id,
        });
      });

      return births;
    },
    ...options,
  });
}

export function useGetBirth(id: string, options?: UseQueryOptions<BirthModel>) {
  return useQuery({
    queryKey: options?.queryKey ?? birthKey.detail(id),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      const birth = result.data() as any;
      return { ...birth, birthAt: birth.birthAt.toDate(), key: result.id };
    },
    ...options,
  });
}
