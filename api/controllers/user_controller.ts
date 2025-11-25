import { Request, Response } from "express";
import {
  createUserService,
  loginUserService,
  listUsersService,
} from "../services/user_services";

export async function registerUserController(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const user = await createUserService({ name, email, password });

    return res.status(201).json(user);
  } catch (err: any) {
    const status = err.statusCode || 400;
    return res.status(status).json({ error: err.message || "Erro ao criar usuário" });
  }
}

export async function loginUserController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await loginUserService({ email, password });

    return res.json({
      message: "Login realizado com sucesso",
      token,
    });
  } catch (err: any) {
    const status = err.statusCode || 400;
    return res.status(status).json({ error: err.message || "Erro ao fazer login" });
  }
}

export async function listUsersController(req: Request, res: Response) {
  try {
    const users = await listUsersService();
    return res.json(users);
  } catch (err: any) {
    return res.status(500).json({ error: "Erro ao listar usuários" });
  }
}
