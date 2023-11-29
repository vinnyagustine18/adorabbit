import { ScrollView } from 'react-native';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import Container from '../../components/container';
import { AnimatedFAB, Divider, List } from 'react-native-paper';
import { router } from 'expo-router';
import Icons from 'react-native-vector-icons/Feather';

import { View } from '../../components/themed';
import { useGetDrugs } from '../../api-hook/drug/query';

export default function DrugList() {
  const query = useGetDrugs();
  const data = query.data ?? [];

  return (
    <Container>
      <AnimatedFAB
        icon={() => <Icons name="plus" size={20} />}
        onPress={() => router.push('/drug/create')}
        extended={false}
        label="Create Drug"
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
              <List.Subheader>Drug List</List.Subheader>
              {data.map((item) => (
                <View key={item.id}>
                  <List.Item
                    key={item.id}
                    onPress={() => router.push(`/drug/${item.id}`)}
                    title={[item.type, item.dose].join(' - ')}
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
