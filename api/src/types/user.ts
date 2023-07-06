import { JwtPayload } from "jsonwebtoken";

export type User = {
  id: string;
  credentialId: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateUser = Omit<User, "id" | "createdAt" | "updatedAt">;


export type UserTable = {
  id: string;
  credential_id: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
};

export interface UserPayload extends JwtPayload {
  credentialId: string;
}