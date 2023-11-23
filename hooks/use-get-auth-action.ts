import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React from "react";
import Toast from "../components/toast";
import { RegisterFormType } from "../modules/register/form-type";
import { LoginFormType } from "../modules/login/form-type";
import { router } from "expo-router";

export default function useGetAuthAction() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);

  const onSignOut = React.useCallback(async () => {
    try {
      setInitializing(true);
      await auth().signOut();
      setUser(null);
      Toast.success("Sign out success");
      router.replace("/profile");
    } catch (e) {
      Toast.error("Sign out failed");
    } finally {
      setInitializing(false);
    }
  }, []);

  const onCreateUser = React.useCallback(
    async (values: RegisterFormType) => {
      try {
        const { passwordConfirmation, ...rest } = values;
        setInitializing(true);
        const result = await auth().createUserWithEmailAndPassword(
          rest.email,
          rest.password
        );
        const id = result.user.uid;
        await firestore().collection("users").doc(id).set(rest);
        Toast.success("Register Successful");
        router.replace("/profile");
      } catch (e) {
        Toast.error(JSON.stringify(e));
      } finally {
        setInitializing(false);
      }
    },
    [setInitializing]
  );

  const onLogin = React.useCallback(async (values: LoginFormType) => {
    try {
      setInitializing(true);
      const result = await auth().signInWithEmailAndPassword(
        values.email,
        values.password
      );
      setUser(result.user);
      Toast.success("Login Successful");
      router.replace("/(tabs)/");
    } catch (e) {
      Toast.error(JSON.stringify(e));
    } finally {
      setInitializing(false);
    }
  }, []);

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing, setInitializing]);

  return {
    isLoading: initializing,
    user,
    onSignOut,
    onCreateUser,
    onLogin,
  };
}
