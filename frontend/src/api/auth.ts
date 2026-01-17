import api from "./axios";
import { User } from "../types/user";

export async function login(email: string): Promise<User> {
  const res = await api.post<User>("/auth/login", { email });
  return res.data;
}
