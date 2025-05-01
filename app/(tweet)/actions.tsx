"use server";

import db from "@/lib/db";

export async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
    },
    take: 3,
    skip: page * 3,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}

export async function getTweetsLength() {
  return await db.tweet.count();
}
