import { useLocalSearchParams } from "expo-router";
import { Text, View } from "../../components/themed";

export default function RabbitShowScreen() {
  const params = useLocalSearchParams();
  console.log(params);
  return (
    <View>
      <Text>Rabbit Show</Text>
    </View>
  );
}
