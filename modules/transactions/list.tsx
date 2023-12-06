import { ScrollView } from 'react-native';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import Container from '../../components/container';
import { AnimatedFAB, Divider, List } from 'react-native-paper';
import { router } from 'expo-router';
import Icons from 'react-native-vector-icons/Feather';

import { View } from '../../components/themed';
import { useGetTransactions } from '../../api-hook/transaction/query';
import { format } from 'date-fns';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { UserTypeEnum } from '../../api-hook/user/model';
import {
  TransactionModel,
  TransactionTypeEnum,
} from '../../api-hook/transaction/model';
import React from 'react';

interface Props {
  type: 'adjustment' | 'sales';
}

export default function TransactionList(props: Props) {
  const { type } = props;
  const { user } = useGetAuthAction();
  const query = useGetTransactions();

  const userId = user?.id;
  const isSales = type === 'sales';
  const isUserSeller = user?.type === UserTypeEnum.seller;

  const filterFn = React.useCallback(
    (transaction: TransactionModel) => {
      const isContribute =
        transaction.createBy.id === userId || transaction.seller.id === userId;
      if (isSales) {
        return transaction.type === TransactionTypeEnum.sell && isContribute;
      }

      return transaction.type === TransactionTypeEnum.purchase && isContribute;
    },
    [isSales, userId],
  );

  const data = (query.data ?? []).filter(filterFn);

  return (
    <Container>
      {isUserSeller && !isSales && (
        <AnimatedFAB
          icon={() => <Icons name="plus" size={20} />}
          onPress={() => router.push('/transaction/create')}
          extended={false}
          label="Create Transaction"
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 3,
          }}
        />
      )}
      <ScrollView>
        <FetchWrapperComponent
          empty={data.length === 0}
          onRetry={query.refetch}
          error={query.error?.message}
          isLoading={query.isFetching}
          component={
            <List.Section>
              <List.Subheader>
                {isSales ? 'Transaction List' : 'Product Adjustment List'}
              </List.Subheader>
              {data.map((item) => (
                <View key={item.id}>
                  <List.Item
                    key={item.id}
                    onPress={() => router.push(`/transaction/${item.id}`)}
                    title={[
                      isSales ? item.seller.name : item.id,
                      format(item.transactionAt, 'dd MMM yyyy, HH:mm'),
                      `${item.products.length} Items`,
                    ].join(' - ')}
                    description={[item.status, `Rp ${item.paymentAmount}`].join(
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
