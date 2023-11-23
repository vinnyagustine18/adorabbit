import firestore from "@react-native-firebase/firestore";
import { VacineModel } from "./model";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const collection = "vacines";

const vacineKey = {
  listKey: "vacines",
  detailKey: "vacine",
  list: () => [vacineKey.listKey],
  detail: (id: string) => [vacineKey.detailKey, id],
};

export function useGetVacines(options?: UseQueryOptions<VacineModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? vacineKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const users: VacineModel[] = [];

      result.forEach((result) => {
        const user = result.data() as VacineModel;
        users.push({ ...user, id: result.id });
      });

      return users;
    },
    ...options,
  });
}

export function useGetVacine(
  id: string,
  options?: UseQueryOptions<VacineModel>
) {
  return useQuery({
    queryKey: options?.queryKey ?? vacineKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      return { ...(result.data() as VacineModel), id: result.id };
    },
    ...options,
  });
}
