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
import { Text, View } from "../../components/themed";
import { Button, List, WhiteSpace } from "@ant-design/react-native";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "../../constants/Colors";

export default function TypeList() {
  const query = useGetTypes();
  const colorScheme = useColorScheme();

  return (
    <Container>
      <TouchableHighlight
        style={{
          position: "absolute",
          borderRadius: 9999,
          zIndex: 10,
          bottom: 16,
          right: 16,
        }}
        onPress={() => router.push("/type/create")}
      >
        <FontAwesome
          name="plus-circle"
          color={Colors[colorScheme ?? "light"].tint}
          size={36}
        />
      </TouchableHighlight>
      <ScrollView>
        <FetchWrapperComponent
          empty={(query.data ?? []).length === 0}
          onRetry={query.refetch}
          error={query.error?.message}
          isLoading={query.isFetching}
          component={
            <List renderHeader="Rabbit List">
              {(query.data ?? []).map((item) => (
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
