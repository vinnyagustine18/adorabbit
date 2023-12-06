import { ActivityIndicator, Text } from 'react-native-paper';
import { View } from '../../components/themed';
import { useLocalSearchParams } from 'expo-router';
import { useGetUser } from '../../api-hook/user/query';
import { useGetRabbits } from '../../api-hook/rabbit/query';
import Container from '../../components/container';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';

import SellerForm from './components/form';
import { ScrollView } from 'react-native';

export default function SellerView() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const queryUser = useGetUser(id!);

  const queryRabbits = useGetRabbits();
  const rabbits = (queryRabbits.data ?? []).filter(
    (rabbit) => rabbit.user.id === id && rabbit.isActive && rabbit.quantity > 0,
  );

  const seller = queryUser.data;

  return (
    <Container style={{ padding: 10 }}>
      <FetchWrapperComponent
        onRetry={queryUser.refetch}
        error={queryUser.error?.message}
        isLoading={queryUser.isFetching}
        component={
          <View
            style={{
              marginBottom: 12,
            }}
          >
            <Text variant="headlineLarge">{seller?.name}</Text>
            <Text variant="bodyMedium">{seller?.address}</Text>
            <Text variant="bodyMedium">{seller?.phoneNumber}</Text>
          </View>
        }
      />

      <FetchWrapperComponent
        onRetry={queryRabbits.refetch}
        error={queryRabbits.error?.message}
        isLoading={queryRabbits.isFetching || queryUser.isFetching}
        loadingComponent={<ActivityIndicator />}
        component={
          <ScrollView>
            <SellerForm rabbits={rabbits} seller={seller!} />
          </ScrollView>
        }
      />
    </Container>
  );
}
