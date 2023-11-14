import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import colorConstant from "../../constants/color.constant";
import { Text } from "../themed";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "outline";
  textStyle?: TextStyle;
  loading?: boolean;
}
export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    textStyle,
    loading,
    style,
    ...restProps
  } = props;

  const render = () => {
    if (loading) {
      return <ActivityIndicator color={colorConstant.white} size={20} />;
    }

    if (typeof children === "string") {
      return (
        <Text
          style={[
            {
              color:
                variant === "primary"
                  ? colorConstant.white
                  : colorConstant.primaryOrange1,
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      );
    }
    return children;
  };

  const backgroundColor = useMemo(() => {
    if (props.disabled) {
      return colorConstant.primaryOrange3;
    }
    switch (variant) {
      case "primary":
        if (loading) {
          return colorConstant.primaryOrange3;
        }
        return colorConstant.primaryOrange1;
      default:
        return undefined;
    }
  }, [loading, props.disabled, variant]);

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      if (loading || restProps.disabled) {
        return null;
      }
      return restProps.onPress?.(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, restProps.disabled, restProps.onPress]
  );
  return (
    <TouchableOpacity
      {...restProps}
      onPress={handlePress}
      style={[
        styles.touchableOpacity,
        {
          backgroundColor,
        },
        variant === "outline" && styles.outlineStyle,
        style,
      ]}
    >
      {render()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    paddingVertical: 12,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },

  outlineStyle: {
    borderWidth: 1,
    borderColor: colorConstant.primaryOrange1,
  },
});
