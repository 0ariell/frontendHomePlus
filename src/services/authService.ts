// src/services/authService.ts
import api from "./api";

export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: "CLIENT" | "WORKER";
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: "CLIENT" | "WORKER";
}

export const register = (dto: RegisterDTO) =>
  api.post<void>("/auth/register", dto);

export const login = (dto: LoginDTO) =>
  api.post<LoginResponse>("/auth/login", dto);

export const getProfile = () => api.get<UserProfile>("/users/profile");
