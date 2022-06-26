import * as SC from "./styles";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  path: string;
  active: boolean;
}

export const SidebarItem = ({ title, description, path, active}: Props) => {
  return (
    <SC.Container>
      <Link to={path}>
        <SC.Info>
          <SC.Title>{title}</SC.Title>
          <SC.Description>{description}</SC.Description>
        </SC.Info>
        <SC.Point active={active}></SC.Point>
      </Link>
    </SC.Container>
  )
};