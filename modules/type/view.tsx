import { router, useLocalSearchParams } from "expo-router";
import { useGetType } from "../../api-hook/type/query";
import TypeForm from "./components/form";
import FetchWrapperComponent from "../../components/common/fetch-wrapper-component";
import { ActivityIndicator, Text } from "react-native-paper";
import React from "react";
import { TypeFormMethod, TypeFormType } from "./components/form-type";
import firestore from "@react-native-firebase/firestore";
import Toast from "../../components/toast";
import Container from "../../components/container";
import useGetAuthAction from "../../hooks/use-get-auth-action";
import { View } from "../../components/themed";

export default function TypeShow() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const { user, isLoading } = useGetAuthAction();
  const userId = user?.uid;

  const query = useGetType(id);
  const type = query.data;

  const onSubmit = React.useCallback(
    async (values: TypeFormType, form: TypeFormMethod) => {
      const result = await firestore()
        .collection("types")
        .doc(query.data?.id!)
        .update({
          ...values,
          userId,
        });

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
        component={<TypeForm type={type} onSubmit={onSubmit} />}
      />
    </Container>
  );
}
