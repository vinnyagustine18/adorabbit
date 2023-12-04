import { ActivityIndicator, Text } from 'react-native-paper';
import { View } from '../../components/themed';
import { useLocalSearchParams } from 'expo-router';
import { useGetUser } from '../../api-hook/user/query';
import { useGetRabbits } from '../../api-hook/rabbit/query';
import Container from '../../components/container';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { FlatList } from 'react-native';

export default function SellerView() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const queryUser = useGetUser(id!);

  const queryRabbits = useGetRabbits();
  const rabbits = (queryRabbits.data ?? []).filter(
    (rabbit) => rabbit.user.id === id && rabbit.isActive && rabbit.quantity > 0,
  );

  return (
    <Container>
      <FetchWrapperComponent
        onRetry={queryUser.refetch}
        error={queryUser.error?.message}
        isLoading={queryUser.isFetching}
        component={
          <View>
            <Text>{queryUser.data?.name}</Text>
          </View>
        }
      />
      <FetchWrapperComponent
        onRetry={queryRabbits.refetch}
        error={queryRabbits.error?.message}
        isLoading={queryRabbits.isFetching}
        loadingComponent={<ActivityIndicator />}
        component={
          <FlatList
            data={rabbits}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>
                    {item.name} - {item.type.name}
                  </Text>
                </View>
              );
            }}
            keyExtractor={({ id }) => id}
          />
        }
      />
    </Container>
  );
}
