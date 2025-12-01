import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";


interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
    }
  }, []);

  async function login(email: string, password: string) {
    try {
      const response = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      const { token } = data;

      setToken(token);
      localStorage.setItem("token", token);
    } catch (err: any) {
      console.error("Erro ao fazer login", err);
      throw new Error("Credenciais inválidas");
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const response = await fetch("http://localhost:3333/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar, tente novamente.");
      }

      await login(email, password);
    } catch (err: any) {
      console.error("Erro ao registrar", err);
      throw new Error("Erro ao registrar, tente novamente.");
    }
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
}
