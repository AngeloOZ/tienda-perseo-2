import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function disconnectPrisma(fun: any) {
  fun()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e: any) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export default disconnectPrisma;
