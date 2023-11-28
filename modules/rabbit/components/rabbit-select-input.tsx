import { useQuery } from "@tanstack/react-query";
import Select, {
  CustomSelectInputProps,
  ListType,
} from "../../../components/element/select-input";

import { useGetRabbits } from "../../../api-hook/rabbit/query";

export interface Props extends CustomSelectInputProps {}

export default function RabbitSelectInput(props: Props) {
  const { disabled, ...rest } = props;
  const query = useGetRabbits();
  const data = query.data ?? [];

  const list: ListType[] = data.map((item) => {
    return {
      label: `${item.name} - ${item.type.name} - ${item.gender}`,
      value: item.id,
      extra: item,
    };
  });

  const _disabled = disabled || query.isFetching;

  return <Select list={list} disabled={_disabled} {...rest} />;
}
