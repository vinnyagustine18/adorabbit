import firestore from "@react-native-firebase/firestore";
import { RabbitModel } from "./model";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const collection = "rabbits";

const rabbitKey = {
  listKey: "rabbits",
  detailKey: "rabbit",
  list: () => [rabbitKey.listKey],
  detail: (id: string) => [rabbitKey.detailKey, id],
};

export function useGetRabbits(options?: UseQueryOptions<RabbitModel[]>) {
  return useQuery({
    queryKey: options?.queryKey ?? rabbitKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).get();
      const users: RabbitModel[] = [];

      result.forEach((result) => {
        const user = result.data() as RabbitModel;
        users.push({ ...user, id: result.id });
      });

      return users;
    },
    ...options,
  });
}

export function useGetRabbit(
  id: string,
  options?: UseQueryOptions<RabbitModel>
) {
  return useQuery({
    queryKey: options?.queryKey ?? rabbitKey.list(),
    queryFn: async () => {
      const result = await firestore().collection(collection).doc(id).get();
      return { ...(result.data() as RabbitModel), id: result.id };
    },
    ...options,
  });
}
