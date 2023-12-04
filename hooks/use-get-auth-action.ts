import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import React from 'react';
import Toast from '../components/toast';
import { RegisterFormType } from '../modules/register/form-type';
import { LoginFormType } from '../modules/login/form-type';
import { router } from 'expo-router';
import { UserModel } from '../api-hook/user/model';

export default function useGetAuthAction() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] =
    React.useState<FirebaseFirestoreTypes.DocumentData | null>(null);

  const onSignOut = React.useCallback(async () => {
    try {
      setInitializing(true);
      await auth().signOut();
      setUser(null);
      Toast.success('Sign out success');
      router.replace('/profile');
    } catch (e) {
      Toast.error('Sign out failed');
    } finally {
      setInitializing(false);
    }
  }, []);

  const getUser = React.useCallback(async (id: string) => {
    try {
      const user = (await firestore().doc(`users/${id}`).get()).data()!;
      setUser(user);
    } catch (e) {
      setUser(null);
      console.log(e);
    }
  }, []);

  const onCreateUser = React.useCallback(
    async (values: RegisterFormType) => {
      try {
        const { passwordConfirmation, ...rest } = values;
        setInitializing(true);
        const result = await auth().createUserWithEmailAndPassword(
          rest.email,
          rest.password,
        );
        const id = result.user.uid;
        await firestore()
          .collection('users')
          .doc(id)
          .set({ ...rest, id: result.user.uid });

        Toast.success('Register Successful');
        router.replace('/profile');
      } catch (e) {
        console.log(e);
        Toast.error(JSON.stringify(e));
      } finally {
        setInitializing(false);
      }
    },
    [setInitializing],
  );

  const onLogin = React.useCallback(
    async (values: LoginFormType) => {
      try {
        setInitializing(true);
        const result = await auth().signInWithEmailAndPassword(
          values.email,
          values.password,
        );
        await getUser(result.user.uid);

        Toast.success('Login Successful');
        router.replace('/(tabs)/');
      } catch (e) {
        console.log(e);
        Toast.error(JSON.stringify(e));
      } finally {
        setInitializing(false);
      }
    },
    [getUser],
  );

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      user ? getUser(user.uid) : setUser(null);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, [getUser, initializing]);

  return {
    isLoading: initializing,
    user: user as UserModel | null,
    onSignOut,
    onCreateUser,
    onLogin,
  };
}
