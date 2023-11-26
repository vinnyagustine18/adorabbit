import { Text } from "../themed";

interface Props {
  data?: any;
  defaultLabel: string;
  editLabel?: string;
}

export default function FormHeader(props: Props) {
  const { data, defaultLabel, editLabel } = props;
  return (
    <Text
      style={{
        marginLeft: 16,
        fontWeight: "600",
        fontSize: 18,
      }}
    >
      {data ? editLabel ?? defaultLabel : defaultLabel}
    </Text>
  );
}
