import firestore from '@react-native-firebase/firestore';
import { MateModel } from './model';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const collection = 'mates';

export const mateKey = {
  listKey: 'mates',
  detailKey: 'mate',
  list: () => [mateKey.listKey],
  detail: (id: string) => [mateKey.detailKey, id],
};

export function useGetMates(options?: UseQueryOptions<MateModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? mateKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const mates: MateModel[] = [];

      result.forEach((result) => {
        const mate = result.data() as any;
        mates.push({ ...mate, mateAt: mate.mateAt.toDate(), key: result.id });
      });

      return mates;
    },
    ...options,
  });
}

export function useGetMate(id: string, options?: UseQueryOptions<MateModel>) {
  return useQuery({
    queryKey: options?.queryKey ?? mateKey.detail(id),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      const mate = result.data() as any;
      return { ...mate, mateAt: mate.mateAt.toDate(), key: result.id };
    },
    ...options,
  });
}
