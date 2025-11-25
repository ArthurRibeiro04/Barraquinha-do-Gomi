import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = 3333;

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado com sucesso ✅");
    app.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao inicializar o banco:", err);
  });
