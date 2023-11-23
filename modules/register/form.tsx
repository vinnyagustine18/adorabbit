import React from "react";
import Form from "../../components/form";
import { RegisterFormSchema, RegisterFormType } from "./form-type";
import useYupValidationResolver from "../../hooks/use-yup-validation-resolver";
import { useForm } from "react-hook-form";
import { Text, View } from "../../components/themed";
import { Button, WhiteSpace } from "@ant-design/react-native";
import { router } from "expo-router";
import TextInput from "../../components/element/text-input";
import Container from "../../components/container";
import isEmpty from "lodash/isEmpty";
import AddressComponent from "../../components/address-component";
import auth from "@react-native-firebase/auth";
import RadioInput from "../../components/element/radio-input";
import { UserTypeEnum } from "../../api-hook/user/model";
import { ScrollView } from "react-native";
import useGetCurrentLocation from "../../hooks/use-get-current-location";
import firestore from "@react-native-firebase/firestore";
import useGetAuthAction from "../../hooks/use-get-auth-action";

enum RegisterStepEnum {
  email = "email",
  address = "address",
}

export default function RegisterForm() {
  const { location } = useGetCurrentLocation();
  const { onCreateUser } = useGetAuthAction();
  const [step, setStep] = React.useState<RegisterStepEnum>(
    RegisterStepEnum.email
  );
  const defaultValues = React.useMemo<RegisterFormType>(() => {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      //
      name: "",
      phoneNumber: "",
      type: UserTypeEnum.user,
      //
      address: "Universitas Sumatera Utara",
      latitude: location?.coords?.latitude ?? 3.566854,
      longitude: location?.coords?.longitude ?? 98.659142,
    };
  }, []);

  const resolver = useYupValidationResolver(RegisterFormSchema()) as any;

  const methods = useForm<RegisterFormType>({
    resolver,
    defaultValues,
  });

  const { trigger, setValue } = methods;

  const onSubmit = React.useCallback(async (values: RegisterFormType) => {
    onCreateUser(values);
  }, []);

  const { back, next, onClickBack, onClickNext, title } = React.useMemo(() => {
    switch (step) {
      case RegisterStepEnum.email:
        return {
          title: "First Step",
          back: "",
          next: "Next",
          onClickNext: () => {
            trigger(["email", "password", "passwordConfirmation"]);
            setStep(RegisterStepEnum.address);
          },
          onClickBack: () => {},
        };
      case RegisterStepEnum.address:
        return {
          title: "Final Step",
          back: "Back",
          next: "Save",
          onClickNext: () => {
            methods.handleSubmit(onSubmit as any)();
          },
          onClickBack: () => {
            setStep(RegisterStepEnum.email);
          },
        };
    }
  }, [step, trigger, setStep, methods]);

  const compoenents = React.useCallback(() => {
    switch (step) {
      case RegisterStepEnum.email:
        return (
          <>
            <TextInput name="name" label="Full Name" placeholder="fill name" />
            <WhiteSpace size="xl" />
            <TextInput
              type="phone-pad"
              name="phoneNumber"
              label="Phone Number"
              placeholder="fill phone number"
            />
            <WhiteSpace size="xl" />
            <TextInput
              name="email"
              type="email-address"
              placeholder="fill the email"
              label="Email"
            />
            <WhiteSpace size="xl" />
            <TextInput
              name="address"
              type="text"
              placeholder="fill the address"
              label="Address"
            />
            <WhiteSpace size="xl" />
            <TextInput
              name="latitude"
              type="number"
              placeholder="fill the latitude"
              label="Latitude"
            />
            <WhiteSpace size="xl" />
            <TextInput
              name="longitude"
              type="number"
              placeholder="fill the longitude"
              label="Longitude"
            />
            <WhiteSpace size="xl" />
            <TextInput
              name="password"
              type="password"
              placeholder="fill the password"
              label="Password "
            />
            <WhiteSpace size="xl" />
            <TextInput
              name="passwordConfirmation"
              placeholder="fill the password confirmation"
              label="Password Confirmation"
              type="password"
            />
            <WhiteSpace size="xl" />
            <RadioInput
              name="type"
              options={[
                {
                  label: "User",
                  value: UserTypeEnum.user,
                },
                {
                  label: "Seller",
                  value: UserTypeEnum.seller,
                },
              ]}
            />
            <WhiteSpace size="xl" />
          </>
        );
      case RegisterStepEnum.address:
      default:
        return (
          <AddressComponent
            onChange={(values) => {
              setValue("latitude", values.latitude);
              setValue("longitude", values.longitude);
              setValue("address", values.address);
            }}
            value={{
              address: methods.getValues("address"),
              latitude: methods.getValues("latitude"),
              longitude: methods.getValues("longitude"),
            }}
          />
        );
    }
  }, [step]);

  return (
    <Container
      style={{
        paddingHorizontal: step === RegisterStepEnum.address ? 0 : 16,
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
      }}
    >
      <Form methods={methods}>
        <WhiteSpace size="xl" />
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "600" }}>
          {title}
        </Text>
        <WhiteSpace size="xl" />
        {step === RegisterStepEnum.email ? (
          <ScrollView
            style={{
              height: "75%",
            }}
          >
            {compoenents()}
          </ScrollView>
        ) : (
          compoenents()
        )}

        <View
          style={{
            position: step === RegisterStepEnum.address ? "absolute" : "static",
            bottom: 16,
            flex: 1,
            width: "100%",
            backgroundColor: "transparent",
            flexDirection: "row",
            marginTop: 24,
          }}
        >
          {!!back && (
            <Button
              style={{ flex: 1, marginHorizontal: 16 }}
              onPress={onClickBack}
              type="warning"
            >
              {back}
            </Button>
          )}
          <Button
            style={{ flex: 1, marginHorizontal: 16 }}
            onPress={onClickNext}
            loading={methods.formState.isSubmitting}
            disabled={!isEmpty(methods.formState.errors)}
            type="primary"
          >
            {next}
          </Button>
        </View>
      </Form>
    </Container>
  );
}
