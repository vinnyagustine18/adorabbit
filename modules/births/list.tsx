import { ScrollView } from 'react-native';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import Container from '../../components/container';
import { AnimatedFAB, Divider, List } from 'react-native-paper';
import { router } from 'expo-router';
import Icons from 'react-native-vector-icons/Feather';

import { View } from '../../components/themed';
import { useGetBirths } from '../../api-hook/birth/query';
import { format } from 'date-fns';

export default function BirthList() {
  const query = useGetBirths();
  const data = query.data ?? [];

  return (
    <Container>
      <AnimatedFAB
        icon={() => <Icons name="plus" size={20} />}
        onPress={() => router.push('/birth/create')}
        extended={false}
        label="Create Birth"
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
              <List.Subheader>Birth List</List.Subheader>
              {data.map((item) => (
                <View key={item.id}>
                  <List.Item
                    key={item.id}
                    onPress={() => router.push(`/birth/${item.id}`)}
                    title={[
                      item.rabbit.name,
                      format(item.birthAt, 'dd MMM yyyy'),
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
