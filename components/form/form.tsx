import {
  FormProvider,
  FormProviderProps,
  SubmitHandler,
} from "react-hook-form";
import invariant from "invariant";
import * as React from "react";

export interface FormStateProps {
  editable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormProps {
  methods: Omit<FormProviderProps<any>, "children">;
  children: React.ReactNode;
  style?: any;
  defaultEditable?: boolean;
}

export const FormContext = React.createContext<FormStateProps>({
  editable: true,
  setIsEditable: () => {},
});

export default function Form(props: FormProps) {
  const [isEditable, setIsEditable] = React.useState(
    props.defaultEditable !== undefined ? props.defaultEditable : true
  );
  const { methods, children } = props;

  const value = React.useMemo<FormStateProps>(
    () => ({
      editable: isEditable && !methods.formState.isSubmitting,
      setIsEditable,
    }),
    [isEditable, methods.formState.isSubmitting]
  );

  return (
    <FormContext.Provider value={value}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormContext.Provider>
  );
}

interface Props {
  children: (context: FormStateProps) => any;
}

export function FormState(props: Props) {
  const context = React.useContext(FormContext);
  return props.children(context);
}

export function useFormState(): FormStateProps {
  const context = React.useContext(FormContext);
  invariant(
    context !== undefined,
    "useFormState must be used inside Form Container"
  );
  return context;
}
