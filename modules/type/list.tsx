import {
  FlatList,
  Pressable,
  ScrollView,
  TouchableHighlight,
  useColorScheme,
} from "react-native";
import { useGetTypes } from "../../api-hook/type/query";
import FetchWrapperComponent from "../../components/common/fetch-wrapper-component";
import Container from "../../components/container";
import { List } from "@ant-design/react-native";
import { router } from "expo-router";
import FloatingActionButton from "../../components/floating-action-button";

export default function TypeList() {
  const query = useGetTypes();
  const data = query.data ?? [];

  return (
    <Container>
      <FloatingActionButton onPress={() => router.push("/type/create")} />

      <ScrollView>
        <FetchWrapperComponent
          empty={data.length === 0}
          onRetry={query.refetch}
          error={query.error?.message}
          isLoading={query.isFetching}
          component={
            <List renderHeader="Type List">
              {data.map((item) => (
                <List.Item
                  key={item.id}
                  onPress={() => router.push(`/type/${item.id}`)}
                >
                  {[item.name, item.id].join(" - ")}
                </List.Item>
              ))}
            </List>
          }
        />
      </ScrollView>
    </Container>
  );
}
