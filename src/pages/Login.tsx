import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginForm";
import { FormContainer, Title } from "../components/StyledComponents";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/");
  };

  return (
    <FormContainer>
      <Title>Login</Title>
      <LoginForm onSuccess={handleLoginSuccess} />
    </FormContainer>
  );
}
