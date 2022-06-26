import * as SC from "./styles";

type Props = {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export const SelectOption = ({title, description, selected, onClick}: Props) => {
  return (
    <SC.Container onClick={onClick} selected={selected}>
      <SC.Info>
        <SC.Title>{title}</SC.Title>
        <SC.Description>{description}</SC.Description>
      </SC.Info>
    </SC.Container>
  )
}