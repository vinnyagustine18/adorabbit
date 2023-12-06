import { Divider, List } from 'react-native-paper';
import React from 'react';
import { ScrollView } from 'react-native';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { router } from 'expo-router';
import Container from '../../components/container';
import { UserTypeEnum } from '../../api-hook/user/model';

export default function Profile() {
  const { onSignOut, user } = useGetAuthAction();
  return (
    <Container>
      <ScrollView>
        <List.Section>
          <List.Subheader>User</List.Subheader>
          <List.Item title="Edit Profile" />
          <Divider />
          {user?.type === UserTypeEnum.seller && (
            <>
              <List.Subheader>Management</List.Subheader>
              <List.Item
                title="Type List"
                onPress={() => router.push('/type/')}
              />
              <List.Item
                title="Rabbit List"
                onPress={() => router.push('/rabbit/')}
              />
              <List.Item
                title="Mate List"
                onPress={() => router.push('/mate/')}
              />
              <List.Item
                title="Drug List"
                onPress={() => router.push('/drug/')}
              />
              <List.Item
                title="Vacine List"
                onPress={() => router.push('/vacine/')}
              />
              <List.Item
                title="Health List"
                onPress={() => router.push('/health/')}
              />
              <List.Item
                title="Birth List"
                onPress={() => router.push('/birth/')}
              />
              <List.Item
                title="Product Adjustment List"
                onPress={() => router.push('/product-adjustment')}
              />
              <Divider />
            </>
          )}
          <List.Item title="Logout" onPress={onSignOut} />
        </List.Section>
      </ScrollView>
    </Container>
  );
}
