import * as SC from "../../styles/styles"
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { push, ref, set, get } from "firebase/database";
import { database } from "../../services/firebase";
import '../../styles/auth.scss';

export const Home = () => {
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState('');
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom1(event: FormEvent) {
    event.preventDefault();

    const firebaseRoomsForm = ref(database, 'rooms');
    const firebaseForm = await push(firebaseRoomsForm);
    set(firebaseForm, {
      municipio: newRoom,
    });
    navigate(`/${firebaseForm.key}/formstep1`)
    // if (newRoom === '') {
    //   alert('Preencha o Nome do Município')
    // } else {
    // }
  };

  async function handleCreateRoom2(event: FormEvent) {
    event.preventDefault();

    const firebaseRoomsForm = ref(database, 'rooms');
    const firebaseForm = await push(firebaseRoomsForm);
    set(firebaseForm, {
      municipio: newRoom,
    });
    navigate(`/${firebaseForm.key}/formstepA1`)
    // if (newRoom === '') {
    //   alert('Preencha o Nome do Município')
    // } else {
    // }
  };

  async function handleCreateRoom3(event: FormEvent) {
    event.preventDefault();

    const firebaseRoomsForm = ref(database, 'rooms');
    const firebaseForm = await push(firebaseRoomsForm);
    set(firebaseForm, {
      municipio: newRoom,
    });
    navigate(`/${firebaseForm.key}/formstepB1`)
    // if (newRoom === '') {
    //   alert('Preencha o Nome do Município')
    // } else {
    // }
  };

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      alert('Insira o código')
      return;
    };

    const roomRef = await get(ref(database, `rooms/${roomCode}`))

    if (!roomRef.exists()) {
      alert('Questionário não existe!')
      return;
    }
    if (roomRef.val().endedAt) {
      alert('Questionário Finalizado.')
      return;
    }
    navigate(`/${roomCode}/formstep1`)
  };

  return (
    <div id="page-auth">
      <aside>
        <strong>Programa Criança Feliz</strong>
        <p>Responda a pesquisa sobre o projeto</p>
      </aside>
      <main>
        <div className="main-content">

          <div className="mainContentHome">
            <div>
              <h2>Municípios <u>aderidos</u> ao PCF</h2>
              <form onSubmit={handleCreateRoom1}>
                {/* <input
                  type="text"
                  placeholder="Qual o seu município"
                  onChange={event => setNewRoom(event.target.value)}
                  value={newRoom}
                /> */}
                <button
                  type="submit"
                >Clique aqui
                </button>
              </form>
            </div>

            <div>
              <p>ou digite o <u>código</u> do formulário</p>
              <form onSubmit={handleJoinRoom}>
                <input
                  type="text"
                  placeholder="Código do formulário"
                  onChange={event => setRoomCode(event.target.value)}
                  value={roomCode}
                />
                <button
                  type="submit"
                >Clique aqui
                </button>
              </form>
            </div>
          </div>

          <hr />

          <div className="mainContentHome">
            <div>
              <h2>Municípios <u>elegíveis <br/> mas não aderidos</u> ao PCF</h2>
              <form onSubmit={handleCreateRoom2}>
                {/* <input
                  type="text"
                  placeholder="Qual o seu município"
                  onChange={event => setNewRoom(event.target.value)}
                  value={newRoom}
                /> */}
                <button
                  type="submit"
                >Clique aqui
                </button>
              </form>
            </div>

            <div>
              <p>ou digite o <u>código</u> do formulário</p>
              <form onSubmit={handleJoinRoom}>
                <input
                  type="text"
                  placeholder="Código do formulário"
                  onChange={event => setRoomCode(event.target.value)}
                  value={roomCode}
                />
                <button
                  type="submit"
                >Clique aqui
                </button>
              </form>
            </div>
          </div>

          <hr />

          <div className="mainContentHome">
            <div>
              <h2>Municípios <u>desistentes</u> do PCF</h2>
              <form onSubmit={handleCreateRoom3}>
                {/* <input
                  type="text"
                  placeholder="Qual o seu município"
                  onChange={event => setNewRoom(event.target.value)}
                  value={newRoom}
                /> */}
                <button
                  type="submit"
                >Clique aqui
                </button>
              </form>
            </div>

            <div>
              <p>ou digite o <u>código</u> do formulário</p>
              <form onSubmit={handleJoinRoom}>
                <input
                  type="text"
                  placeholder="Código do formulário"
                  onChange={event => setRoomCode(event.target.value)}
                  value={roomCode}
                />
                <button
                  type="submit"
                >Clique aqui
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
};

{/* <p>ou digite o <u>código</u> do formulário</p>
<form onSubmit={handleJoinRoom}>
  <input
    type="text"
    placeholder="Código do formulário"
    onChange={event => setRoomCode(event.target.value)}
    value={roomCode}
  />
  <button
    type="submit"
  >Clique aqui
  </button>
</form> */}