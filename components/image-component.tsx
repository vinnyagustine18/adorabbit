import * as React from "react";
import { StyleSheet, View } from "react-native";

import { FastImageProps, ImageStyle } from "react-native-fast-image";
import FastImage from "react-native-fast-image";
import imageConstant from "../constants/image.constant";

interface Props extends FastImageProps {
  placeholderStyle?: ImageStyle;
}

export default function ImageComponent(props: Props) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { onLoad, resizeMode = "contain", ...restProps } = props;

  return (
    <View>
      <FastImage
        {...restProps}
        resizeMode={resizeMode}
        onLoad={(e) => {
          onLoad && onLoad(e);
          if (restProps.source && typeof restProps.source === "object") {
            if ((restProps.source as any).uri) {
              setIsLoaded(true);
            }
          } else {
            setIsLoaded(true);
          }
        }}
      />
      {!isLoaded && (
        <FastImage
          resizeMode="contain"
          source={require("./../assets/images/icon.png")}
          style={[styles.absolute, props.placeholderStyle]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
