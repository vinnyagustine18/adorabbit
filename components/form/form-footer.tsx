import { useFormContext } from "react-hook-form";
import { useFormState } from "./form";
import { View } from "../themed";
import { Button } from "@ant-design/react-native";
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
                style={{ flex: 1 }}
                type="warning"
                onPress={() => setIsEditable(false)}
              >
                Cancel
              </Button>
            ) : (
              <Button
                type="ghost"
                style={{ flex: 1 }}
                onPress={() => setIsEditable(true)}
              >
                Edit
              </Button>
            )}
          </>
        )}
        {editable && (
          <Button
            onPress={methods.handleSubmit(onSubmit)}
            loading={methods.formState.isSubmitting}
            disabled={methods.formState.isSubmitting}
            style={{ flex: 1 }}
            type="primary"
          >
            Save
          </Button>
        )}
      </View>
    </>
  );
}
