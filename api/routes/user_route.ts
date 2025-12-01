import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  listUsersController,
  getMeController,
} from "../controllers/user_controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRoutes = Router();

userRoutes.post("/auth/register", registerUserController);
userRoutes.post("/auth/login", loginUserController);
userRoutes.get("/users", listUsersController);
userRoutes.get("/auth/me", authMiddleware, getMeController);

export default userRoutes;
