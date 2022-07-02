import * as SC from "../../styles/styles"
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../services/firebase";
import '../../styles/auth.scss';

export const Home = () => {
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
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

  return (
    <div id="page-auth">
      <aside>
        <strong>Programa Criança Feliz</strong>
        <p>Responda a pesquisa sobre o projeto</p>
      </aside>
      <main>
        <div className="main-content">

          <h2>Municípios <u>adeptos</u> ao PCF</h2>
          <form onSubmit={handleCreateRoom}>
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

          <h2>Municípios <u>não adeptos</u> ao PCF</h2>
          <form onSubmit={handleCreateRoom}>
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

          <h2>Municípios <u>desistentes</u> ao PCF</h2>
          <form onSubmit={handleCreateRoom}>
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
