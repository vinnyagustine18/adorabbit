import { ScrollView } from "react-native";
import { useGetRabbits } from "../../api-hook/rabbit/query";
import Container from "../../components/container";
import FloatingActionButton from "../../components/floating-action-button";
import FetchWrapperComponent from "../../components/common/fetch-wrapper-component";
import { List } from "@ant-design/react-native";
import { router } from "expo-router";

export default function RabbitList() {
  const query = useGetRabbits();
  const data = query.data ?? [];

  return (
    <Container>
      <FloatingActionButton onPress={() => router.push("/rabbit/create")} />
      <ScrollView>
        <FetchWrapperComponent
          empty={data.length === 0}
          onRetry={query.refetch}
          error={query.error?.message}
          isLoading={query.isFetching}
          component={
            <List renderHeader="Rabbit List">
              {data.map((item) => (
                <List.Item
                  key={item.id}
                  onPress={() => router.push(`/rabbit/${item.id}`)}
                >
                  {[item.type.name, item.name, item.id].join(" - ")}
                </List.Item>
              ))}
            </List>
          }
        />
      </ScrollView>
    </Container>
  );
}
