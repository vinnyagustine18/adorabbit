import { StyleSheet } from "react-native";

export enum SeparatorTypeEnum {
  all = "all",
  horizontal = "horizontal",
  vertical = "vertical",
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}

export const styMargin = (value: number, type?: SeparatorTypeEnum) => {
  let styles;

  switch (type) {
    case SeparatorTypeEnum.horizontal:
      styles = StyleSheet.create({
        styMargin: {
          marginHorizontal: value,
        },
      });

      break;
    case SeparatorTypeEnum.vertical:
      styles = StyleSheet.create({
        styMargin: {
          marginVertical: value,
        },
      });

      break;
    case SeparatorTypeEnum.top:
      styles = StyleSheet.create({
        styMargin: {
          marginTop: value,
        },
      });

      break;
    case SeparatorTypeEnum.bottom:
      styles = StyleSheet.create({
        styMargin: {
          marginBottom: value,
        },
      });

      break;
    case SeparatorTypeEnum.left:
      styles = StyleSheet.create({
        styMargin: {
          marginLeft: value,
        },
      });

      break;
    case SeparatorTypeEnum.right:
      styles = StyleSheet.create({
        styMargin: {
          marginRight: value,
        },
      });

      break;
    default:
      styles = StyleSheet.create({
        styMargin: {
          margin: value,
        },
      });

      break;
  }

  return styles.styMargin;
};

export const styPadding = (value: number, type?: SeparatorTypeEnum) => {
  let styles;

  switch (type) {
    case SeparatorTypeEnum.horizontal:
      styles = StyleSheet.create({
        styPadding: {
          paddingHorizontal: value,
        },
      });

      break;
    case SeparatorTypeEnum.vertical:
      styles = StyleSheet.create({
        styPadding: {
          paddingVertical: value,
        },
      });

      break;
    case SeparatorTypeEnum.top:
      styles = StyleSheet.create({
        styPadding: {
          paddingTop: value,
        },
      });

      break;
    case SeparatorTypeEnum.bottom:
      styles = StyleSheet.create({
        styPadding: {
          paddingBottom: value,
        },
      });

      break;
    case SeparatorTypeEnum.left:
      styles = StyleSheet.create({
        styPadding: {
          paddingLeft: value,
        },
      });

      break;
    case SeparatorTypeEnum.right:
      styles = StyleSheet.create({
        styPadding: {
          paddingRight: value,
        },
      });

      break;
    default:
      styles = StyleSheet.create({
        styPadding: {
          padding: value,
        },
      });

      break;
  }

  return styles.styPadding;
};
