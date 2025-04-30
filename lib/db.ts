import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// async function test() {
//   await db.user.delete({
//     where: {
//       email: "jse033101@zod.com",
//     },
//   });
// }

// test();

export default db;
