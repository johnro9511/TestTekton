/* 0 = employee | 1 = manager */
export type Role = "Employee" | "Manager";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}