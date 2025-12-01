import { Navigate, useNavigate } from "react-router-dom";
import RegisterForm from "../components/registerForm";
import { FormContainer, Title } from "../components/StyledComponents";

export default function Register() {
  
  const navigate = useNavigate()

  const handleRegisterSuccess = () => {
      navigate("/");
  };

  return (
    <FormContainer>
      <Title>Registre-se</Title>
      <RegisterForm onSuccess={handleRegisterSuccess} />
    </FormContainer>
  );
}
