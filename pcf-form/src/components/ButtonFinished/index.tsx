import { CheckCircle } from 'phosphor-react';
import { Alert } from 'reactstrap';
import { ButtonHTMLAttributes, useState } from 'react';
import './styles.scss'
import { Link, useParams } from "react-router-dom";

type RoomParams = {
  id: string;
};


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> 


export const Finished = ({...props}: ButtonProps) => {
  const [show, setShow] = useState(false);
  const params = useParams<RoomParams>()
  const roomId = params.id

  if (show) {
    return (
      <>
        <Alert className="success">
          Formulário enviado com sucesso!
          <CheckCircle size={20} color="#2dd24e" weight="light" />
        </Alert>
      </>
    );
  }
  return (
    <>
      <Link className="buttonAll" to={`/${roomId}/formstep9`}>Voltar</Link>
      <button
        className="buttonAll"
        onClick={() => setShow(true)}
        {...props}
      >Finalizar
      </button>
    </>
  )
}

{/* <Button
className="buttonAll"
variant="primary"
onClick={handleShow}
type="submit"
>
Finalizar
</Button>

<Offcanvas show={show} onHide={handleClose}>
<Offcanvas.Header closeButton>
  <Offcanvas.Title>Offcanvas</Offcanvas.Title>
</Offcanvas.Header>
<Offcanvas.Body>
  Some text as placeholder. In real life you can have the elements you
  have chosen. Like, text, images, lists, etc.
</Offcanvas.Body>
</Offcanvas> */}