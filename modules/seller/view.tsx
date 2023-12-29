import { ActivityIndicator, Text } from 'react-native-paper';
import { View } from '../../components/themed';
import { useLocalSearchParams } from 'expo-router';
import { useGetUser } from '../../api-hook/user/query';
import { useGetRabbits } from '../../api-hook/rabbit/query';
import Container from '../../components/container';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';

import SellerForm from './components/form';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

export default function SellerView() {
  const params = useLocalSearchParams();
  const { id } = params as any;

  const queryUser = useGetUser(id!);

  const queryRabbits = useGetRabbits();
  const rabbits = (queryRabbits.data ?? []).filter(
    (rabbit) => rabbit.user.id === id && rabbit.isActive,
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
              gap: 8,
            }}
          >
            <View
              style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}
            >
              <Icon name="person" size={30} />
              <Text variant="headlineLarge">{seller?.name}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}
            >
              <Icon name="map" size={20} />
              <Text variant="bodyMedium">{seller?.address}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}
            >
              <Icon name="mobile-alt" size={24} />
              <Text variant="bodyMedium">{seller?.phoneNumber}</Text>
            </View>
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
