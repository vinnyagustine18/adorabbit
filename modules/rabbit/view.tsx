import { router, useLocalSearchParams } from "expo-router";
import { useGetType } from "../../api-hook/type/query";
import TypeForm from "./components/form";
import FetchWrapperComponent from "../../components/common/fetch-wrapper-component";
import { ActivityIndicator, Text } from "react-native-paper";
import React from "react";

import firestore from "@react-native-firebase/firestore";
import Toast from "../../components/toast";
import Container from "../../components/container";
import useGetAuthAction from "../../hooks/use-get-auth-action";
import { useGetRabbit } from "../../api-hook/rabbit/query";
import { RabbitFormMethod, RabbitFormType } from "./components/form-type";
import RabbitForm from "./components/form";
import { getSubmitData } from "./utils";

export default function RabbitShow() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const { user, isLoading } = useGetAuthAction();
  const userId = user?.uid;

  const query = useGetRabbit(id);
  const rabbit = query.data;

  const onSubmit = React.useCallback(
    async (values: RabbitFormType, form: RabbitFormMethod) => {
      const rabbit = await getSubmitData(values, userId!);

      const result = await firestore()
        .collection("rabbits")
        .doc(query.data?.id!)
        .update(rabbit);

      Toast.success("Data Berhasil diubah");
      router.back();

      return result;
    },
    [userId]
  );

  return (
    <Container>
      <FetchWrapperComponent
        onRetry={query.refetch}
        error={query.error?.message}
        isLoading={query.isFetching || isLoading}
        loadingComponent={<ActivityIndicator />}
        component={<RabbitForm rabbit={rabbit} onSubmit={onSubmit} />}
      />
    </Container>
  );
}
