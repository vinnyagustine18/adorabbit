import { useQuery } from "@tanstack/react-query";
import Select, {
  SelectInputProps,
} from "../../../components/element/select-input";
import { Item } from "react-native-picker-select";
import { useGetTypes } from "../../../api-hook/type/query";

interface Props extends Omit<SelectInputProps, "items"> {}

export default function TypeSelectInput(props: Props) {
  const { disabled, ...rest } = props;
  const query = useGetTypes();
  const data = query.data ?? [];

  const items: Item[] = data.map((item) => {
    return {
      label: `${item.name} - ${item.id}`,
      value: item.id,
      extra: item,
    };
  });

  const _disabled = disabled || query.isFetching;

  return <Select items={items} disabled={_disabled} {...rest} />;
}
