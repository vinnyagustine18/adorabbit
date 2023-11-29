import firestore from '@react-native-firebase/firestore';
import { VacineModel } from './model';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const collection = 'vacines';

export const vacineKey = {
  listKey: 'vacines',
  detailKey: 'vacine',
  list: () => [vacineKey.listKey],
  detail: (id: string) => [vacineKey.detailKey, id],
};

export function useGetVacines(options?: UseQueryOptions<VacineModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? vacineKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const vacines: VacineModel[] = [];

      result.forEach((result) => {
        const vacine = result.data() as any;
        vacines.push({
          ...vacine,
          vacineAt: vacine.vacineAt.toDate(),
          key: result.id,
        });
      });

      return vacines;
    },
    ...options,
  });
}

export function useGetVacine(
  id: string,
  options?: UseQueryOptions<VacineModel>,
) {
  return useQuery({
    queryKey: options?.queryKey ?? vacineKey.detail(id),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      const vacine = result.data() as any;
      return { ...vacine, vacineAt: vacine.vacineAt.toDate(), key: result.id };
    },
    ...options,
  });
}
