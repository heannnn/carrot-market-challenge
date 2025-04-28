import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  const users = await db.user.create({
    data: {
      username: "heann",
      email: "heann@nomadcoder.co.kr",
    },
  });

  console.log(users);
}

test();

export default db;
