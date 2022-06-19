
import { Button } from "../components/Button";
import { useForm } from 'react-hook-form'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebase } from "../services/firebase";

import '../styles/home.scss'




export function Home() {

  return (
    <div id="page-auth">
      <aside>
        <strong>Projeto Criança Feliz</strong>
        <p>Responda o questionário</p>
      </aside>
      <main>
        <div className="main-content">
          <form>
            <label htmlFor="email">
              E-mail

            </label>
            <input

              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              autoComplete="username"
            />

            <label htmlFor="password">
              Senha

            </label>
            <input

              type="password"
              name="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
            <Button
              type="submit"
            >
              Criar conta
            </Button>
            <Button
              type="submit"
            >
              Entrar
            </Button>
          </form>
          <div className="separator">
            Entre pelo código do formulário
          </div>
          <form>
            <input
              type="text"
              placeholder="Digite o código do formulário"
            />
            <Button>
              Entrar no formulário
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}