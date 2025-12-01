import React, { useState } from "react";
import {
  FormularioLogin,
  Input,
  Button,
  ErrorNotification,
  SmallText,
  LoginLink,
} from "./StyledComponents";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError("");
      setShowError(false);

      // chama login do AuthContext (faz request + salva no localStorage)
      await login(email, password);

      // deu certo -> página pai faz o navigate("/")
      onSuccess();

    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }

  return (
    <>
      <ErrorNotification show={showError}>{error}</ErrorNotification>

      <FormularioLogin onSubmit={handleSubmit}>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit">
          Login
        </Button>

        <SmallText>
          Não tem conta? <LoginLink to="/register">Cadastre-se</LoginLink>
        </SmallText>

      </FormularioLogin>
    </>
  );
}
