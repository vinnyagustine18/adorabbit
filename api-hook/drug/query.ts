import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { DrugModel } from "./model";
import firestore from "@react-native-firebase/firestore";

const collection = "drugs";

const drugKey = {
  listKey: "drugs",
  detailKey: "drug",
  list: () => [drugKey.listKey],
  detail: (id: string) => [drugKey.detailKey, id],
};

export function useGetDrugs(options?: UseQueryOptions<DrugModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? drugKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const users: DrugModel[] = [];

      result.forEach((result) => {
        const user = result.data() as DrugModel;
        users.push({ ...user, id: result.id });
      });

      return users;
    },
    ...options,
  });
}

export function useGetDrug(id: string, options?: UseQueryOptions<DrugModel>) {
  return useQuery({
    queryKey: options?.queryKey ?? drugKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      return { ...(result.data() as DrugModel), id: result.id };
    },
    ...options,
  });
}
