import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HeaderContainer,
  HeaderTitle,
  HeaderActions,
  HeaderButton
} from "./StyledComponents";
import { useEffect, useState } from "react";

export function Header() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
      async function checkAuth() {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
  
        try {
          const res = await fetch("http://localhost:3333/auth/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
              localStorage.removeItem("token");
            }
            setIsLoggedIn(false);
            return;
          }
  
          const data = await res.json();
          setUser(data);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Erro ao validar auth:", error);
          setIsLoggedIn(false);
        }
      }
  
      checkAuth();
    }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <HeaderContainer>
      <HeaderTitle>Barraquinha Do Gomi</HeaderTitle>

      <HeaderActions>
        {!isLoggedIn ? (
          <>
            <HeaderButton onClick={() => navigate("/login")}>
              Login
            </HeaderButton>
            <HeaderButton onClick={() => navigate("/register")}>
              Registrar
            </HeaderButton>
          </>
        ) : (
          <HeaderButton onClick={handleLogout}>Logout</HeaderButton>
        )}
      </HeaderActions>
    </HeaderContainer>
  );
}
