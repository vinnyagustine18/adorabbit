import { Text } from 'react-native-paper';

interface Props {
  data?: any;
  defaultLabel: string;
  editLabel?: string;
}

export default function FormHeader(props: Props) {
  const { data, defaultLabel, editLabel } = props;
  return (
    <Text
      variant="titleMedium"
      style={{
        marginLeft: 16,
      }}
    >
      {data ? editLabel ?? defaultLabel : defaultLabel}
    </Text>
  );
}
