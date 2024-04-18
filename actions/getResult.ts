"use server";
import { db } from "@/utils/db";
import { Casa } from "@prisma/client";


export const Rango = async () => {
  const resultados: Casa[] = await db.$queryRaw`SELECT * FROM CasaComentarioView`;
  return resultados;
};

