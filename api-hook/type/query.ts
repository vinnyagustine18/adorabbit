import firestore from "@react-native-firebase/firestore";
import { TypeModel } from "./model";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const collection = "types";

const typeKey = {
  listKey: "types",
  detailKey: "type",
  list: () => [typeKey.listKey],
  detail: (id: string) => [typeKey.detailKey, id],
};

export function useGetTypes(options?: UseQueryOptions<TypeModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? typeKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const users: TypeModel[] = [];

      result.forEach((result) => {
        const user = result.data() as TypeModel;

        users.push({ ...user, id: result.id });
      });

      return users;
    },
    ...options,
  });
}

export function useGetType(id: string, options?: UseQueryOptions<TypeModel>) {
  return useQuery({
    queryKey: options?.queryKey ?? typeKey.detail(id),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      return { ...(result.data() as TypeModel), id: result.id };
    },
    ...options,
  });
}
