import React from 'react';
import Form from '../../components/form/form';
import { RegisterFormSchema, RegisterFormType } from './form-type';
import useYupValidationResolver from '../../hooks/use-yup-validation-resolver';
import { useForm } from 'react-hook-form';
import { View } from '../../components/themed';

import TextInput from '../../components/element/text-input';
import Container from '../../components/container';
import isEmpty from 'lodash/isEmpty';
import RadioInput from '../../components/element/radio-input';
import { UserTypeEnum } from '../../api-hook/user/model';
import { ScrollView } from 'react-native';
import useGetCurrentLocation from '../../hooks/use-get-current-location';
import useGetAuthAction from '../../hooks/use-get-auth-action';
import { Button, Text } from 'react-native-paper';
import colorConstant from '../../constants/color.constant';
import AddressComponent from '../../components/address-component';

enum RegisterStepEnum {
  email = 'email',
  address = 'address',
}

export default function RegisterForm() {
  const { location } = useGetCurrentLocation();
  const { onCreateUser } = useGetAuthAction();
  const [step, setStep] = React.useState<RegisterStepEnum>(
    RegisterStepEnum.email,
  );

  const [isInitiate, setIsInitiate] = React.useState(false);
  const defaultValues = React.useMemo<RegisterFormType>(() => {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      //
      name: '',
      phoneNumber: '',
      type: UserTypeEnum.user,
      //
      address: '',
      latitude: location?.coords?.latitude ?? 3.566854,
      longitude: location?.coords?.longitude ?? 98.659142,
    };
  }, [location]);

  const resolver = useYupValidationResolver(RegisterFormSchema()) as any;

  const methods = useForm<RegisterFormType>({
    resolver,
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values: RegisterFormType) => {
      onCreateUser(values);
    },
    [onCreateUser],
  );

  const { back, next, onClickBack, onClickNext, title } = React.useMemo(() => {
    return {
      title: 'Register',
      back: '',
      next: 'Save',
      onClickNext: () => {
        methods.handleSubmit(onSubmit as any)();
      },
      onClickBack: () => {},
    };
  }, [methods, onSubmit]);

  const compoenents = React.useCallback(() => {
    switch (step) {
      case RegisterStepEnum.email:
        return (
          <>
            <TextInput name="name" label="Full Name" placeholder="fill name" />
            <TextInput
              keyboardType="phone-pad"
              name="phoneNumber"
              label="Phone Number"
              placeholder="fill phone number"
            />
            <TextInput
              name="email"
              placeholder="fill the email"
              label="Email"
            />
            <TextInput
              name="address"
              placeholder="fill the address"
              label="Address"
              onPressIn={() => {
                setStep(RegisterStepEnum.address);
              }}
            />
            <TextInput
              name="password"
              type="password"
              placeholder="fill the password"
              label="Password "
            />
            <TextInput
              name="passwordConfirmation"
              placeholder="fill the password confirmation"
              label="Password Confirmation"
              type="password"
            />
            <RadioInput
              name="type"
              label="Type"
              options={[
                {
                  label: 'User',
                  value: UserTypeEnum.user,
                },
                {
                  label: 'Seller',
                  value: UserTypeEnum.seller,
                },
              ]}
            />
          </>
        );
      case RegisterStepEnum.address:
      default:
        return (
          <AddressComponent
            onSubmit={(value) => {
              methods.setValue('address', value.address);
              methods.setValue('latitude', value.latitude);
              methods.setValue('longitude', value.longitude);
              setStep(RegisterStepEnum.email);
            }}
          />
        );
      // return (
      //   <AddressComponent
      //     onChange={(values) => {
      //       setValue("latitude", values.latitude);
      //       setValue("longitude", values.longitude);
      //       setValue("address", values.address);
      //     }}
      //     value={{
      //       address: methods.getValues("address"),
      //       latitude: methods.getValues("latitude"),
      //       longitude: methods.getValues("longitude"),
      //     }}
      //   />
      // );
    }
  }, [methods, step]);

  const isMainPage = step === RegisterStepEnum.email;

  React.useEffect(() => {
    if (!isInitiate && !!location?.coords) {
      methods.setValue('latitude', location.coords.latitude);
      methods.setValue('longitude', location.coords.longitude);
      setIsInitiate(true);
    }
  }, [isInitiate, location?.coords, methods]);

  return (
    <Container
      style={{
        paddingHorizontal: step === RegisterStepEnum.address ? 0 : 16,
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
      }}
    >
      <Form methods={methods}>
        {isMainPage && (
          <Text
            variant="headlineMedium"
            style={{ textAlign: 'center', fontWeight: '600', marginBottom: 16 }}
          >
            {title}
          </Text>
        )}
        {isMainPage ? (
          <ScrollView
            overScrollMode="always"
            style={{
              height: '80%',
            }}
          >
            {compoenents()}
          </ScrollView>
        ) : (
          compoenents()
        )}

        {isMainPage && (
          <View
            style={{
              bottom: 16,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              marginTop: 24,
            }}
          >
            {!!back && (
              <Button
                style={{ flex: 1, marginHorizontal: 16 }}
                onPress={onClickBack}
                buttonColor={colorConstant.redDefault}
                textColor={colorConstant.white}
              >
                {back}
              </Button>
            )}
            <Button
              style={{ flex: 1 }}
              onPress={onClickNext}
              loading={methods.formState.isSubmitting}
              disabled={
                !isEmpty(methods.formState.errors) ||
                methods.formState.isSubmitting
              }
              mode="contained"
            >
              {next}
            </Button>
          </View>
        )}
      </Form>
    </Container>
  );
}
