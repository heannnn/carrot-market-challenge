"use server";

import { TWEET_PER_PAGE } from "@/lib/constants";
import db from "@/lib/db";

export async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          bio: true,
        },
      },
    },
    take: TWEET_PER_PAGE,
    skip: page * TWEET_PER_PAGE,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}

export async function getTweetsLength() {
  return await db.tweet.count();
}
