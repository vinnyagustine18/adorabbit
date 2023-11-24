import { Text, View } from "../../components/themed";
import useGetAuthAction from "../../hooks/use-get-auth-action";

export default function TransactionScreen() {
  const { user } = useGetAuthAction();
  return (
    <View>
      <Text>
        {!!user ? "Transaction" : "you must login for access this pages"}
      </Text>
    </View>
  );
}
