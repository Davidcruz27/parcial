"use server";
import { db } from "@/utils/db";
import { Casa } from "@prisma/client";

export const mostrarTodo = async () => {
  const resultados: Casa[] = await db.$queryRaw`SELECT * FROM Mostrar`;
  return resultados;
};
export const Bogota = async () => {
  const resultados: Casa[] = await db.$queryRaw`SELECT * FROM Bogota`;
  return resultados;
};
export const Villavicencio = async () => {
  const resultados: Casa[] = await db.$queryRaw`SELECT * FROM Villavicencio`;
  return resultados;
};
export const Rango = async () => {
  const resultados: Casa[] = await db.$queryRaw`SELECT * FROM Rango`;
  return resultados;
};
export const Verde = async () => {
  const resultados: Casa[] = await db.$queryRaw`SELECT * FROM Verde`;
  return resultados;
};
