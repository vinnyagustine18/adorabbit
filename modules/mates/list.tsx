import { ScrollView } from 'react-native';
import { useGetMates } from '../../api-hook/mate/query';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { AnimatedFAB, Divider, List } from 'react-native-paper';
import { View } from '../../components/themed';
import { router } from 'expo-router';
import Icons from 'react-native-vector-icons/Feather';
import Container from '../../components/container';

export default function MateList() {
  const query = useGetMates();
  const data = query.data ?? [];
  return (
    <Container>
      <AnimatedFAB
        icon={() => <Icons name="plus" size={20} />}
        onPress={() => router.push('/mate/create')}
        extended={false}
        label="Create Mate"
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
              <List.Subheader>Mate List</List.Subheader>
              {data.map((item) => (
                <View key={item.id}>
                  <List.Item
                    key={item.id}
                    onPress={() => router.push(`/mate/${item.id}`)}
                    title={[item.maleRabbit.name, item.femaleRabbit.name].join(
                      ' - ',
                    )}
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
