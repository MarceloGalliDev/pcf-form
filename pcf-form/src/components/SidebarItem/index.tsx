import * as C from "./styles";
import { Link } from "react-router-dom";
import { BookSVG } from "../../assets/BookSVG";
import { MailSVG } from "../../assets/MailSVG";
import { ProfileSVG } from "../../assets/ProfileSVG";


type Props = {
  title: string;
  description: string;
  icon: string;
  path: string;
  active: boolean;
}

export const SidebarItem = ({ title, description, icon, path, active}: Props) => {
  return (
    <C.Container>
      <Link to={path}>
        <C.Info>
          <C.Title>{title}</C.Title>
          <C.Description>{description}</C.Description>
        </C.Info>
        <C.Point active={active}></C.Point>
      </Link>
    </C.Container>
  )
};