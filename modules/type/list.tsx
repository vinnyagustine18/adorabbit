import { ScrollView } from 'react-native';
import { useGetTypes } from '../../api-hook/type/query';
import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import Container from '../../components/container';
import { AnimatedFAB, Divider, List } from 'react-native-paper';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colorConstant from '../../constants/color.constant';
import { View } from '../../components/themed';

export default function TypeList() {
  const query = useGetTypes();
  const data = query.data ?? [];

  return (
    <Container>
      <AnimatedFAB
        icon={() => (
          <FontAwesome name="plus" size={20} color={colorConstant.gray1} />
        )}
        onPress={() => router.push('/type/create')}
        extended={false}
        label="Create Type"
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
              <List.Subheader>Type List</List.Subheader>
              {data.map((item) => (
                <View key={item.id}>
                  <List.Item
                    key={item.id}
                    onPress={() => router.push(`/type/${item.id}`)}
                    title={[item.name, item.id].join(' - ')}
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
