import { useFormContext } from "react-hook-form";
import { useFormState } from "./form";
import { View } from "../themed";
import { Button } from "react-native-paper";
import colorConstant from "../../constants/color.constant";

interface Props {
  data?: any;
  onSubmit: any;
}

export default function FormFooter(props: Props) {
  const { data, onSubmit } = props;
  const { editable, setIsEditable } = useFormState();
  const methods = useFormContext();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
        }}
      >
        {!!data && (
          <>
            {editable && !!data ? (
              <Button
                buttonColor={colorConstant.redDefault}
                textColor={colorConstant.white}
                style={{ flex: 1 }}
                onPress={() => setIsEditable(false)}
              >
                Cancel
              </Button>
            ) : (
              <Button style={{ flex: 1 }} onPress={() => setIsEditable(true)}>
                Edit
              </Button>
            )}
          </>
        )}
        {editable && (
          <Button
            mode="contained"
            onPress={methods.handleSubmit(onSubmit)}
            loading={methods.formState.isSubmitting}
            disabled={methods.formState.isSubmitting}
            style={{ flex: 1 }}
          >
            Save
          </Button>
        )}
      </View>
    </>
  );
}
