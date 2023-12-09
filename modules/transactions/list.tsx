import { ScrollView } from 'react-native';

import FetchWrapperComponent from '../../components/common/fetch-wrapper-component';
import Container from '../../components/container';
import { AnimatedFAB, Divider, List, Text } from 'react-native-paper';
import { router } from 'expo-router';
import Icons from 'react-native-vector-icons/Feather';

import { View } from '../../components/themed';
import { useGetTransactions } from '../../api-hook/transaction/query';
import { format } from 'date-fns';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { UserTypeEnum } from '../../api-hook/user/model';
import {
  TransactionModel,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../../api-hook/transaction/model';
import React from 'react';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import colorConstant from '../../constants/color.constant';

interface Props {
  type: 'adjustment' | 'sales';
}

enum TransactionTabsEnum {
  default = 'default',
  active = 'active',
  pending = 'pending',
  finish = 'finish',
  cancel = 'cancel',
}

export default function TransactionList(props: Props) {
  const { type } = props;
  const { user } = useGetAuthAction();
  const query = useGetTransactions();

  const userId = user?.id;
  const isSales = type === 'sales';
  const isUserSeller = user?.type === UserTypeEnum.seller;

  const [tab, setTab] = React.useState<TransactionTabsEnum>(
    isSales ? TransactionTabsEnum.active : TransactionTabsEnum.default,
  );

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

  const filterStatusFn = React.useCallback(
    (transaction: TransactionModel) => {
      switch (tab) {
        case TransactionTabsEnum.default:
          return true;

        case TransactionTabsEnum.active:
          return transaction.status === TransactionStatusEnum.active;

        case TransactionTabsEnum.pending:
          return transaction.status === TransactionStatusEnum.pending;

        case TransactionTabsEnum.finish:
          return transaction.status === TransactionStatusEnum.finish;

        case TransactionTabsEnum.cancel:
          return transaction.status === TransactionStatusEnum.cancel;
      }
    },
    [tab],
  );

  const data = (query.data ?? []).filter(filterFn);

  const components = React.useMemo(() => {
    const _data = data.filter(filterStatusFn);
    return (
      <React.Fragment>
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
            empty={_data.length === 0}
            onRetry={query.refetch}
            error={query.error?.message}
            isLoading={query.isFetching}
            component={
              <List.Section>
                {_data.map((item) => (
                  <View key={item.id}>
                    <List.Item
                      key={item.id}
                      onPress={() => router.push(`/transaction/${item.id}`)}
                      title={[
                        isSales ? item.seller.name : 'adjustment',
                        format(item.transactionAt, 'dd MMM yyyy, HH:mm'),
                        `${item.products.length} Items`,
                      ].join(' - ')}
                      description={
                        isSales
                          ? [item.status, `Rp ${item.paymentAmount}`].join(
                              ' - ',
                            )
                          : undefined
                      }
                    />
                    <Divider />
                  </View>
                ))}
              </List.Section>
            }
          />
        </ScrollView>
      </React.Fragment>
    );
  }, [
    data,
    filterStatusFn,
    isSales,
    isUserSeller,
    query.error?.message,
    query.isFetching,
    query.refetch,
  ]);

  const tabs = [
    TransactionTabsEnum.pending,
    TransactionTabsEnum.active,
    TransactionTabsEnum.finish,
    TransactionTabsEnum.cancel,
  ];

  return (
    <Container>
      <Text style={{ marginTop: 12, marginLeft: 12 }} variant="titleMedium">
        {isSales ? 'Transaction List' : 'Product Adjustment List'}
      </Text>
      {isSales ? (
        <TabsProvider
          defaultIndex={0}
          onChangeIndex={(index) => {
            switch (index) {
              case 0:
                setTab(TransactionTabsEnum.pending);
                break;
              case 1:
                setTab(TransactionTabsEnum.active);

                break;
              case 2:
                setTab(TransactionTabsEnum.finish);
                break;
              case 3:
              default:
                setTab(TransactionTabsEnum.cancel);
                break;
            }
          }}
        >
          <Tabs
            style={{ backgroundColor: colorConstant.white }}
            showLeadingSpace
          >
            {tabs.map((tab) => {
              const badges = data.filter((item) => {
                switch (tab) {
                  case TransactionTabsEnum.default:
                    return true;
                  case TransactionTabsEnum.active:
                    return item.status === TransactionStatusEnum.active;
                  case TransactionTabsEnum.pending:
                    return item.status === TransactionStatusEnum.pending;
                  case TransactionTabsEnum.finish:
                    return item.status === TransactionStatusEnum.finish;
                  case TransactionTabsEnum.cancel:
                  default:
                    return item.status === TransactionStatusEnum.cancel;
                }
              }).length;

              return (
                <TabScreen
                  key={tab}
                  label={tab}
                  badge={badges === 0 ? undefined : badges}
                >
                  {components}
                </TabScreen>
              );
            })}
          </Tabs>
        </TabsProvider>
      ) : (
        components
      )}
    </Container>
  );
}
