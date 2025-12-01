import { useState } from "react";
import { Input, Button, ErrorMessage, ErrorNotification, SmallText, LoginLink } from "./StyledComponents";
import { FormularioRegistro } from "./StyledComponents"; 

interface RegisterFormProps {
  onSuccess: () => void; 
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false); 

  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setShowError(true); 
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      setError("");  

      
      const response = await fetch("http://localhost:3333/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), 
      });

      
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error);
      }

      if (response.status === 201) {
        onSuccess();
      }
    
    } catch (err: any) {
      setError(err.message); 
      setShowError(true); 
      setTimeout(() => setShowError(false), 3000); 
    }
  }

  return (
    <>
      <ErrorNotification show={showError}>{error}</ErrorNotification>
      <FormularioRegistro onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}  
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>

        <SmallText>
          Já tem conta? <LoginLink to="/login">Faça login</LoginLink>
        </SmallText>
      </FormularioRegistro>
    </>
  );
}
