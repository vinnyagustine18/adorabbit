import { useRouter } from "expo-router";
import React, { ReactNode, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ViewStyle,
  BackHandler,
} from "react-native";
import colorConstant from "../constants/color.constant";

interface Props {
  children: React.ReactNode;
  topSafeArea?: boolean;
  bottomSafeArea?: boolean;
  style?: ViewStyle;
  halfBackgroundContainer?: boolean;
  keyboardAvoidingViewBehavior?: "padding" | "height" | "position" | "none";
}

export default function Container(props: Props) {
  const {
    children,
    topSafeArea = true,
    bottomSafeArea = true,
    style,
    halfBackgroundContainer = false,
    keyboardAvoidingViewBehavior = "padding",
  } = props;
  const containerStyle = [styles.container, style];
  const router = useRouter();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        router.back();
        return true;
      }
    );
    return () => backHandler.remove();
  }, [router]);

  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      style={containerStyle}
      behavior={
        keyboardAvoidingViewBehavior === "none"
          ? undefined
          : keyboardAvoidingViewBehavior
      }
    >
      {topSafeArea && <SafeAreaView />}
      {halfBackgroundContainer && <View style={styles.topBackground} />}
      {children}
      {bottomSafeArea && <SafeAreaView />}
    </KeyboardAvoidingView>
  ) : (
    <SafeAreaView style={containerStyle}>
      {halfBackgroundContainer && <View style={styles.topBackground} />}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "50%",
    backgroundColor: colorConstant.white,
  },
});
