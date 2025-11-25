import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);


export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export interface LoginResponse {
  user: SafeUser;
  token: string;
}

function toSafeUser(user: User): SafeUser {
  const { password, ...rest } = user;
  return rest;
}

const JWT_SECRET: string = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export async function createUserService({
  name,
  email,
  password,
}: CreateUserDTO) {
  if (!name || !email || !password) {
    throw { statusCode: 400, message: "name, email e password são obrigatórios" };
  }

  const existing = await userRepository.findOne({ where: { email } });

  if (existing) {
    throw { statusCode: 409, message: "Email já cadastrado" };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return toSafeUser(user);
}

export async function loginUserService({
  email,
  password,
}: LoginUserDTO): Promise<string> {
  if (!email || !password) {
    throw { statusCode: 400, message: "email e password são obrigatórios" };
  }

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw { statusCode: 401, message: "Credenciais inválidas" };
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    throw { statusCode: 401, message: "Credenciais inválidas" };
  }

  const safeUser = toSafeUser(user);

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      usuario: user.name
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
}

export async function listUsersService() {
  const users = await userRepository.find({
    order: { created_at: "DESC" },
  });

  return users.map(toSafeUser);
}
