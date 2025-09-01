import { PrismaClient } from '@prisma/client';

export enum AgencyType {
  BUS,
  TRAIN,
}

export const prisma = new PrismaClient;