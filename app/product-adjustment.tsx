import Container from '../components/container';
import { Text } from '../components/themed';
import useGetAuthAction from '../hooks/use-get-auth-action';
import TransactionList from '../modules/transactions/list';

export default function ProductAdjustmentScreen() {
  const { user } = useGetAuthAction();
  if (user) {
    return <TransactionList type="adjustment" />;
  }
  return (
    <Container>
      <Text>You must login for use this feature</Text>
    </Container>
  );
}
