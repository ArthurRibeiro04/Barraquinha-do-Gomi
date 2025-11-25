import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  listUsersController,
} from "../controllers/user_controller";

const userRoutes = Router();

userRoutes.post("/auth/register", registerUserController);
userRoutes.post("/auth/login", loginUserController);
userRoutes.get("/users", listUsersController);

export default userRoutes;
