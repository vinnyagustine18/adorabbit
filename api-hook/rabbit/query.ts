import firestore from '@react-native-firebase/firestore';
import { RabbitModel } from './model';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const collection = 'rabbits';

export const rabbitKey = {
  listKey: 'rabbits',
  detailKey: 'rabbit',
  list: () => [rabbitKey.listKey],
  detail: (id: string) => [rabbitKey.detailKey, id],
};

export function useGetRabbits(options?: UseQueryOptions<RabbitModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? rabbitKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const rabbits: RabbitModel[] = [];

      result.forEach((result) => {
        const rabbit = result.data() as RabbitModel;
        rabbits.push({
          ...rabbit,
          birthAt: result.data().birthAt.toDate(),
          key: result.id,
        });
      });

      return rabbits;
    },
    ...options,
  });
}

export function useGetRabbit(
  id: string,
  options?: UseQueryOptions<RabbitModel>,
) {
  return useQuery({
    queryKey: options?.queryKey ?? rabbitKey.detail(id),
    queryFn: async () => {
      const result = await firestore().doc(`${collection}/${id}`).get();
      const rabbit = result.data();
      return {
        ...(rabbit as RabbitModel),
        birthAt: rabbit?.birthAt?.toDate() ?? new Date(),
        key: result.id,
      };
    },
    ...options,
  });
}
