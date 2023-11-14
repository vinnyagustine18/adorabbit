import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { FieldError } from "react-hook-form";
import colorConstant from "../../constants/color.constant";
import { Text } from "../themed";

export interface InputGroupProps extends ViewProps {
  children: React.ReactNode;
  error?: string | boolean | undefined | any | FieldError;
  disabledErrorText?: boolean;
}

export default function InputGroup(props: InputGroupProps) {
  const { error, style, children, disabledErrorText } = props;

  const renderErrorText = React.useMemo(() => {
    if (typeof error === "string") {
      return error;
    } else if (error?.message as FieldError) {
      return error.message;
    }
    return null;
  }, [error]);

  return (
    <View style={style}>
      <View style={[styles.container, !!error && styles.errorContainer]}>
        <View style={styles.content}>{children}</View>
      </View>
      {!!error && !disabledErrorText && renderErrorText && (
        <Text style={styles.errorText}>{renderErrorText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
  },
  label: {
    color: colorConstant.gray1,
    position: "absolute",
    // top: size.inputBottomPadding,
    // left: size.inputHorizontalPadding,
  },
  errorLabel: {
    color: colorConstant.redDefault,
  },
  errorContainer: {
    borderColor: colorConstant.redDefault,
  },
  errorText: {
    color: colorConstant.redDefault,
    fontSize: 13,
  },
  required: {
    color: colorConstant.redDefault,
    fontSize: 13,
    fontWeight: "500",
  },
});
