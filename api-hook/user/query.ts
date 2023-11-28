import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { UserModel } from "./model";
import firestore from "@react-native-firebase/firestore";

const collection = "users";

const userKey = {
  listKey: "users",
  detailKey: "user",
  list: () => [userKey.listKey],
  detail: (id: string) => [userKey.detailKey, id],
};

export function useGetUsers(options?: UseQueryOptions<UserModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? userKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const users: UserModel[] = [];

      result.forEach((result) => {
        const user = result.data() as UserModel;
        users.push({ ...user, key: result.id });
      });

      return users;
    },
    ...options,
  });
}

export function useGetUser(id: string, options?: UseQueryOptions<UserModel>) {
  return useQuery({
    queryKey: options?.queryKey ?? userKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      return { ...(result.data() as UserModel), key: result.id };
    },
    ...options,
  });
}
