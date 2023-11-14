import colorConstant from "../../constants/color.constant";
import sizeConstant from "../../constants/size.constant";
import { View, ActivityIndicator, StyleSheet } from "../elements";

interface Props {
  noPadding?: boolean;
  loadingViewHeight?: number;
}
export default function LoadingViewComponent(props: Props) {
  return (
    <View
      style={[
        styles.loadingContainer,
        !props.noPadding && { paddingHorizontal: sizeConstant.contentPad },
        { height: props.loadingViewHeight || 300 },
      ]}
    >
      <ActivityIndicator color={colorConstant.primaryOrange1} size="large" />
    </View>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
