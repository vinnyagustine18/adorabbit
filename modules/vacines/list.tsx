import { ScrollView } from 'react-native';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { AnimatedFAB, Divider, List } from 'react-native-paper';
import { View } from '../../components/themed';
import { router } from 'expo-router';
import Icons from 'react-native-vector-icons/Feather';
import Container from '../../components/container';
import { useGetVacines } from '../../api-hook/vacine/query';
import { format } from 'date-fns';

export default function VacineList() {
  const query = useGetVacines();
  const data = query.data ?? [];
  return (
    <Container>
      <AnimatedFAB
        icon={() => <Icons name="plus" size={20} />}
        onPress={() => router.push('/vacine/create')}
        extended={false}
        label="Create Vacine"
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
              <List.Subheader>Vacine List</List.Subheader>
              {data.map((item) => (
                <View key={item.id}>
                  <List.Item
                    key={item.id}
                    onPress={() => router.push(`/vacine/${item.id}`)}
                    title={[
                      item.rabbit.name,
                      `(${item.drug.type} - ${item.drug.dose})`,
                      format(item.vacineAt, 'dd MMM yyyy'),
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
