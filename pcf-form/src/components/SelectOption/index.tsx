import * as C from "./styles";

type Props = {
  title: string;
  description: string;
  selected: boolean;
}

export const SelectOption = ({title, description, selected}: Props) => {
  return (
    <C.Container selected={selected}>
      <C.Info>
        <C.Title>{title}</C.Title>
        <C.Description>{description}</C.Description>
      </C.Info>
    </C.Container>
  )
}