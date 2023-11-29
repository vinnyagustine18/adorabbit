import { ScrollView } from 'react-native';
import { useGetRabbits } from '../../api-hook/rabbit/query';
import Container from '../../components/container';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { AnimatedFAB, Divider, List } from 'react-native-paper';
import { router } from 'expo-router';
import Icons from 'react-native-vector-icons/Feather';

import { View } from '../../components/themed';
import { capitalize } from 'lodash';

export default function RabbitList() {
  const query = useGetRabbits();
  const data = query.data ?? [];

  return (
    <Container>
      <AnimatedFAB
        icon={() => <Icons name="plus" size={20} />}
        onPress={() => router.push('/rabbit/create')}
        extended={false}
        label="Create Rabbit"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 3,
        }}
      />
      <ScrollView>
        <FetchWrapperComponent
          empty={data.length === 0}
          onRetry={query.refetch}
          error={query.error?.message}
          isLoading={query.isFetching}
          component={
            <List.Section>
              <List.Subheader>Rabbit List</List.Subheader>

              {data.map((item) => (
                <View key={item.id}>
                  <List.Item
                    title={[
                      item.name,
                      item.type.name,
                      capitalize(item.gender),
                    ].join(' - ')}
                    key={item.id}
                    onPress={() => router.push(`/rabbit/${item.id}`)}
                  />
                  <Divider />
                </View>
              ))}
            </List.Section>
          }
        />
      </ScrollView>
    </Container>
  );
}
