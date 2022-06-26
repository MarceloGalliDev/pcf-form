import * as SC from './styles'

type Props = {
  title: string,
  value: number,
  color?: string,
}

export const ResumeItem = ({title, value, color}: Props) => {
  return (
    <SC.Container>
      <SC.Title>{title}</SC.Title>
      <SC.Info color={color}>R$ {value}</SC.Info>
    </SC.Container>
  )
};