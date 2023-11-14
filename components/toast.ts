import BaseToast, { ToastType, ErrorToast } from "react-native-toast-message";

const Toast: {
  show: (
    type: ToastType,
    title: string,
    message: string,
    onPress?: () => void
  ) => void;
  success: (message: string, title?: string, onPress?: () => void) => void;
  error: (message: string, title?: string, onPress?: () => void) => void;
  info: (message: string, title?: string, onPress?: () => void) => void;
} = {
  show(type, title, message, onPress) {
    BaseToast.show({ type: type, text1: message, text2: title, onPress });
  },
  success(message: string, title: string | undefined, onPress) {
    BaseToast.show({ type: "success", text1: message, text2: title, onPress });
  },
  error(message: string, title: string | undefined, onPress) {
    BaseToast.show({ type: "error", text1: message, text2: title, onPress });
  },
  info(message: string, title: string | undefined, onPress) {
    BaseToast.show({ type: "info", text1: message, text2: title, onPress });
  },
};

export default Toast;
