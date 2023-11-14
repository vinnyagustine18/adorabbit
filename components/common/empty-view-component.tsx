import * as React from "react";
import { View, ActivityIndicator, StyleSheet, Button } from "../elements";
import sizeConstant from "../../constants/size.constant";
import colorConstant from "../../constants/color.constant";
import { Text } from "../themed";

interface Props {
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  refetch?: () => void;
  noPadding?: boolean;
}

export default function EmptyViewComponent(props: Props) {
  const { isLoading, refetch, noPadding } = props;

  return (
    <View
      style={[
        styles.errorViewContainer,
        !noPadding && {
          paddingHorizontal: sizeConstant.contentPad,
        },
      ]}
    >
      <View style={styles.errorContentContainer}>
        <Text style={styles.text}>Tidak ada data</Text>
      </View>
      <View style={styles.errorActionContainer}>
        {isLoading ? (
          <ActivityIndicator color={colorConstant.white} size="large" />
        ) : (
          <View style={styles.refreshContainer}>
            <Button
              variant="primary"
              style={styles.button}
              onPress={() => {
                refetch && refetch();
              }}
            >
              Coba Ulang
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colorConstant.gray1,
    textAlign: "center",
  },
  errorViewContainer: {
    display: "flex",
    marginBottom: 16,
    marginTop: 16,
  },
  errorContentContainer: {},

  errorActionContainer: {},

  refreshContainer: {
    marginTop: 8,
    alignItems: "center",
  },

  button: {
    paddingVertical: 12,
    width: 120,
  },
});
