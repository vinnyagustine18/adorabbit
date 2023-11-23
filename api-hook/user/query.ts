import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { UserType } from "./model";
import firestore from "@react-native-firebase/firestore";

const userKey = {
  listKey: "users",
  detailKey: "user",
  list: () => [userKey.listKey],
  detail: (id: string) => [userKey.detailKey, id],
};

const collection = "users";

export function useGetUsers(options?: UseQueryOptions<UserType[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? userKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const users: UserType[] = [];

      result.forEach((result) => {
        const user = result.data() as UserType;
        users.push(user);
      });

      return users;
    },
    ...options,
  });
}

export function useGetUser(id: string, options?: UseQueryOptions<UserType>) {
  return useQuery({
    queryKey: options?.queryKey ?? userKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      return result.data() as UserType;
    },
    ...options,
  });
}
