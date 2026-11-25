import { api } from './client';
import type { User } from '../types';

export interface LoginResponse extends User { accessToken: string }

export async function login(username: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', { username, password, expiresInMins: 60 });
  return data;
}
