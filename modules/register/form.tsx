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

enum RegisterStepEnum {
  email = "email",
  information = "information",
  address = "address",
}

export default function RegisterForm() {
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
      //
      address: "",
      latitude: 0,
      longitude: 0,
    };
  }, []);

  const resolver = useYupValidationResolver(RegisterFormSchema()) as any;

  const methods = useForm<RegisterFormType>({
    resolver,
    defaultValues,
  });

  const { trigger, setValue } = methods;

  const onSubmit = React.useCallback(async () => {
    try {
      router.replace("/(tabs)/");
    } catch (e) {}
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
            setStep(RegisterStepEnum.information);
          },
          onClickBack: () => {},
        };
      case RegisterStepEnum.information:
        return {
          title: "Second Step",
          back: "Back",
          next: "Next",
          onClickNext: () => {
            trigger(["name", "phoneNumber"]);
            setStep(RegisterStepEnum.address);
          },
          onClickBack: () => {
            setStep(RegisterStepEnum.email);
          },
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
            setStep(RegisterStepEnum.information);
          },
        };
    }
  }, [step, trigger, setStep, methods]);

  const compoenents = React.useCallback(() => {
    switch (step) {
      case RegisterStepEnum.email:
        return (
          <>
            <TextInput
              name="email"
              type="email-address"
              placeholder="fill the email"
              label="Email"
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
          </>
        );
      case RegisterStepEnum.information:
        return (
          <>
            <TextInput name="name" label="Full Name" placeholder="fill name" />
            <WhiteSpace size="xl" />
            <TextInput
              type="phone"
              name="phoneNumber"
              label="Phone Number"
              placeholder="fill phone number"
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
          />
        );
    }
  }, [step]);

  return (
    <Container>
      <View
        style={{
          paddingHorizontal: step === RegisterStepEnum.address ? 0 : 16,
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
        }}
      >
        <Form methods={methods}>
          <Text
            style={{ textAlign: "center", fontSize: 24, fontWeight: "600" }}
          >
            {title}
          </Text>
          <WhiteSpace size="xl" />
          {compoenents()}
          <View
            style={{
              position:
                step === RegisterStepEnum.address ? "absolute" : "static",
              bottom: 16,
              flex: 1,
              width: "100%",
              backgroundColor: "transparent",
              flexDirection: "row",
              marginTop: 16,
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
      </View>
    </Container>
  );
}
