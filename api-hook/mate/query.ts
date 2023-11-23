import firestore from "@react-native-firebase/firestore";
import { MateModel } from "./model";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const collection = "mates";

const mateKey = {
  listKey: "mates",
  detailKey: "mate",
  list: () => [mateKey.listKey],
  detail: (id: string) => [mateKey.detailKey, id],
};

export function useGetMates(options?: UseQueryOptions<MateModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? mateKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const users: MateModel[] = [];

      result.forEach((result) => {
        const user = result.data() as MateModel;
        users.push({ ...user, id: result.id });
      });

      return users;
    },
    ...options,
  });
}

export function useGetMate(id: string, options?: UseQueryOptions<MateModel>) {
  return useQuery({
    queryKey: options?.queryKey ?? mateKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      return { ...(result.data() as MateModel), id: result.id };
    },
    ...options,
  });
}
