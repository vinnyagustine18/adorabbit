import { ScrollView } from 'react-native';
import React from 'react';
import { useGetUsers } from '../../api-hook/user/query';
import { List } from 'react-native-paper';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import { getDistance } from 'geolib';
import useGetCurrentLocation from '../../hooks/use-get-current-location';
import { UserTypeEnum } from '../../api-hook/user/model';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { router } from 'expo-router';
import { View } from '../../components/themed';
import colorConstant from '../../constants/color.constant';

export default function TabOneScreen() {
  const query = useGetUsers();
  const { location } = useGetCurrentLocation();
  const { user } = useGetAuthAction();

  const data = React.useMemo(() => {
    return query.data ?? [];
  }, [query.data]);

  const _data = React.useMemo(() => {
    return data
      .filter((item) => item.type === UserTypeEnum.seller)
      .map((item) => {
        const distance =
          getDistance(
            {
              latitude: location?.coords.latitude ?? user?.latitude ?? 3.566854,
              longitude:
                location?.coords.longitude ?? user?.longitude ?? 98.659142,
            },
            {
              latitude: item.latitude,
              longitude: item.longitude,
            },
          ) / 1000;
        return {
          ...item,
          distance,
        };
      })
      .sort((a, b) => a.distance - b.distance);
  }, [
    data,
    location?.coords.latitude,
    location?.coords.longitude,
    user?.latitude,
    user?.longitude,
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: colorConstant.white }}>
      <ScrollView>
        <FetchWrapperComponent
          empty={data.length === 0}
          error={query.error?.message}
          isLoading={query.isFetching}
          onRetry={query.refetch}
          component={
            <List.Section>
              <List.Subheader>Seller</List.Subheader>
              {_data.map((item) => {
                return (
                  <List.Item
                    key={item.id}
                    title={`${item.name} - ${item.address} - ${item.distance}Km`}
                    onPress={() => router.push(`/seller/${item.id}`)}
                  />
                );
              })}
            </List.Section>
          }
        />
      </ScrollView>
    </View>
  );
}
