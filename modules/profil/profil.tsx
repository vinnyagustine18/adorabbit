import { Divider, List } from 'react-native-paper';
import React from 'react';
import { ScrollView } from 'react-native';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { router } from 'expo-router';
import Container from '../../components/container';

export default function Profile() {
  const { onSignOut } = useGetAuthAction();
  return (
    <Container>
      <ScrollView>
        <List.Section>
          <List.Subheader>User</List.Subheader>
          <List.Item title="Edit Profile" />
          <Divider />
          <List.Subheader>Management</List.Subheader>
          <List.Item title="Type List" onPress={() => router.push('/type/')} />
          <List.Item
            title="Rabbit List"
            onPress={() => router.push('/rabbit/')}
          />
          <List.Item title="Mate List" onPress={() => router.push('/mate/')} />
          <Divider />
          <List.Item title="Logout" onPress={onSignOut} />
        </List.Section>
      </ScrollView>
    </Container>
  );
}
