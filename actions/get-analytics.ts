"use serve"
import { db } from "@/utils/db";

export const getAnalitics = async () => {
  const data = await db.casa.findMany();

  return data;
};
