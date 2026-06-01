import axios from 'axios';
import type { Bar, BarInput } from '../types/bar';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

const client = axios.create({ baseURL });

export async function listBars(): Promise<Bar[]> {
  const { data } = await client.get<Bar[]>('/bars');
  return data;
}

export async function getBar(id: string): Promise<Bar> {
  const { data } = await client.get<Bar>(`/bars/${id}`);
  return data;
}

export async function createBar(input: BarInput): Promise<Bar> {
  const { data } = await client.post<Bar>('/bars', input);
  return data;
}

export async function updateBar(id: string, input: Partial<BarInput>): Promise<Bar> {
  const { data } = await client.put<Bar>(`/bars/${id}`, input);
  return data;
}

export async function deleteBar(id: string): Promise<void> {
  await client.delete(`/bars/${id}`);
}
