import { ScrollView } from 'react-native';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import Container from '../../components/container';
import { AnimatedFAB, Divider, List } from 'react-native-paper';
import { router } from 'expo-router';
import Icons from 'react-native-vector-icons/Feather';

import { View } from '../../components/themed';
import { useGetHealths } from '../../api-hook/health/query';
import { format } from 'date-fns';
import useGetAuthAction from '../../hooks/use-get-auth-action';

export default function HealthList() {
  const { user, isLoading } = useGetAuthAction();
  const query = useGetHealths();
  const data = (query.data ?? []).filter(
    (health) => health.user.id === user.id,
  );

  return (
    <Container>
      <AnimatedFAB
        icon={() => <Icons name="plus" size={20} />}
        onPress={() => router.push('/health/create')}
        extended={false}
        label="Create Health"
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
          isLoading={query.isFetching || isLoading}
          component={
            <List.Section>
              <List.Subheader>Health List</List.Subheader>
              {data.map((item) => (
                <View key={item.id}>
                  <List.Item
                    key={item.id}
                    onPress={() => router.push(`/health/${item.id}`)}
                    title={[
                      item.rabbit.name,
                      format(item.checkAt, 'dd MMM yyyy'),
                    ].join(' - ')}
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
