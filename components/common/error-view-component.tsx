import * as React from "react";

import sizeConstant from "../../constants/size.constant";
import { Text, View } from "../themed";
import colorConstant from "../../constants/color.constant";
import { ActivityIndicator, Button } from "@ant-design/react-native";
import { StyleSheet } from "react-native";

interface Props {
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  refetch?: () => void;
  error?: string;
  noPadding?: boolean;
}

export default function ErrorViewComponent(props: Props) {
  const { isLoading, refetch, error, noPadding } = props;

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
        <Text style={styles.text}>Gagal Memuat {error}</Text>
      </View>
      <View style={styles.errorActionContainer}>
        {isLoading ? (
          <ActivityIndicator color={colorConstant.white} size="large" />
        ) : (
          <View style={styles.refreshContainer}>
            <Button
              type="primary"
              onPress={() => {
                refetch && refetch();
              }}
              style={styles.button}
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
    color: colorConstant.redDefault,
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
