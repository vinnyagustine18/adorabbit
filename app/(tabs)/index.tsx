import { ScrollView } from 'react-native';
import React from 'react';
import { useGetUsers } from '../../api-hook/user/query';
import { List } from 'react-native-paper';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import Container from '../../components/container';
import { getDistance } from 'geolib';
import useGetCurrentLocation from '../../hooks/use-get-current-location';

export default function TabOneScreen() {
  const query = useGetUsers();
  const data = query.data ?? [];
  const { location } = useGetCurrentLocation();
  return (
    <Container>
      <ScrollView>
        <FetchWrapperComponent
          empty={data.length === 0}
          error={query.error?.message}
          isLoading={query.isFetching}
          onRetry={query.refetch}
          component={
            <List.Section>
              <List.Subheader>Users</List.Subheader>
              {data.map((item) => {
                //return meter value
                const distance =
                  getDistance(
                    {
                      latitude: location?.coords.latitude ?? 3.566854,
                      longitude: location?.coords.longitude ?? 98.659142,
                    },
                    {
                      latitude: item.latitude,
                      longitude: item.longitude,
                    },
                  ) / 1000;
                return (
                  <List.Item
                    key={item.id}
                    title={`${item.name} - ${distance}Km`}
                    onPress={() => console.log(item.id)}
                  />
                );
              })}
            </List.Section>
          }
        />
      </ScrollView>
    </Container>
  );
}
