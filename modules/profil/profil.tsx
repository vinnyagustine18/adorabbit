import { Divider, List } from 'react-native-paper';
import React from 'react';
import { ScrollView } from 'react-native';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { router } from 'expo-router';
import Container from '../../components/container';
import { UserTypeEnum } from '../../api-hook/user/model';
import Icon from 'react-native-vector-icons/Fontisto';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Profile() {
  const { onSignOut, user } = useGetAuthAction();
  return (
    <Container>
      <ScrollView>
        <List.Section>
          {user?.type === UserTypeEnum.seller && (
            <>
              <List.Subheader>Management</List.Subheader>
              <List.Item
                style={{ paddingLeft: 24 }}
                left={({ color }) => (
                  <Icon name="prescription" size={24} color={color} />
                )}
                title="Type List"
                onPress={() => router.push('/type/')}
              />
              <List.Item
                style={{ paddingLeft: 24 }}
                left={({ color }) => (
                  <IconMaterial name="rabbit" size={24} color={color} />
                )}
                title="Rabbit List"
                onPress={() => router.push('/rabbit/')}
              />
              <List.Item
                style={{ paddingLeft: 24 }}
                left={({ color }) => (
                  <IconMaterial size={24} name="cards-heart" color={color} />
                )}
                title="Mate List"
                onPress={() => router.push('/mate/')}
              />
              <List.Item
                style={{ paddingLeft: 24 }}
                left={({ color }) => (
                  <Icon size={24} name="pills" color={color} />
                )}
                title="Drug List"
                onPress={() => router.push('/drug/')}
              />
              <List.Item
                style={{ paddingLeft: 24 }}
                left={({ color }) => (
                  <Icon size={24} name="injection-syringe" color={color} />
                )}
                title="Vacine List"
                onPress={() => router.push('/vacine/')}
              />
              <List.Item
                style={{ paddingLeft: 24 }}
                left={({ color }) => (
                  <Icon size={24} name="bandage" color={color} />
                )}
                title="Health List"
                onPress={() => router.push('/health/')}
              />
              <List.Item
                style={{ paddingLeft: 24 }}
                left={({ color }) => (
                  <Icon size={24} name="intersex" color={color} />
                )}
                title="Birth List"
                onPress={() => router.push('/birth/')}
              />
              <List.Item
                style={{ paddingLeft: 24 }}
                left={({ color }) => (
                  <Icon size={24} name="database" color={color} />
                )}
                title="Product Adjustment List"
                onPress={() => router.push('/product-adjustment')}
              />
              <Divider />
            </>
          )}
          <List.Item
            style={{ paddingLeft: 24 }}
            left={({ color }) => (
              <IconMaterial size={24} name="logout" color={color} />
            )}
            title="Logout"
            onPress={onSignOut}
          />
        </List.Section>
      </ScrollView>
    </Container>
  );
}
