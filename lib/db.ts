import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  // await db.user.delete({
  //   where: {
  //     id: 1,
  //   },
  // });
  // await db.tweet.createMany({
  //   data: [
  //     { tweet: "Hello Twitter!", userId: 3 },
  //     { tweet: "Just setting up my Prisma app", userId: 3 },
  //     { tweet: "Another day, another tweet.", userId: 3 },
  //   ],
  // });
}

test();

export default db;
