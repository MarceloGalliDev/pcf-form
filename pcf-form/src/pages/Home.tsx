
import { Button } from "../components/Button";
import * as React from 'react'
import { useForm } from 'react-hook-form'

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
            <label htmlFor="email">E-mail</label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              autoComplete="username"
            />
            <label htmlFor="password">Senha</label>
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