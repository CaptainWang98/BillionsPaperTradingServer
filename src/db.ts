import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

export const luciaPrismaAdapter = new PrismaAdapter(prismaClient.session, prismaClient.user);