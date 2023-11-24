import Container from "../../components/container";
import { Text } from "../../components/themed";
import useGetAuthAction from "../../hooks/use-get-auth-action";

export default function TransactionScreen() {
  const { user } = useGetAuthAction();
  return (
    <Container>
      <Text
        style={{
          textAlign: "center",
        }}
      >
        {!!user ? "Transaction" : "you must login for access this pages"}
      </Text>
    </Container>
  );
}
