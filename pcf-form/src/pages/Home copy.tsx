
import { Button } from "../components/Button";
import { useForm } from 'react-hook-form'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

import '../styles/home.scss'


type FormData = {
  email: string;
  password: string;
}

export function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => console.log(data))

  return (
    <div id="page-auth">
      <aside>
        <strong>Projeto Criança Feliz</strong>
        <p>Responda o questionário</p>
      </aside>
      <main>
        <div className="main-content">
          <form onSubmit={onSubmit}>
            <label htmlFor="email">
              E-mail
              <p>{errors.email && "*Campo obrigatório"}</p>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              autoComplete="username"
            />

            <label htmlFor="password">
              Senha
              <p>{ errors.password && "*Campo obrigatório" }</p>
            </label>
            <input
              {...register("password", { required: true })}
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