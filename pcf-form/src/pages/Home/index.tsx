import * as SC from "../../styles/styles"
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../services/firebase";
import '../../styles/auth.scss';

export const Home = () => {
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState('');

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

  return (
    <div id="page-auth">
      <aside>
        <strong>Programa Criança Feliz</strong>
        <p>Responda a pesquisa sobre o projeto</p>
      </aside>
      <main>
        <div className="main-content">

          <h2>Municípios que <u>aderiram</u> ao PCF</h2>
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

          <hr />

          <h2>Municípios <u>elegíveis mas que não aderiram</u> ao PCF</h2>
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

          <hr />

          <h2>Municípios que <u>deixaram de participar</u> ao PCF</h2>
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
      </main>
    </div>
  )
};
