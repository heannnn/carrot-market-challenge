"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z
    .string({ required_error: "Content is required!" })
    .min(10, "Content must be at least 10 characters.")
    .max(280, "Your post is too long. Maximum 280 characters."),
});

export async function submitTweet(_: any, formData: FormData) {
  const data = { tweet: formData.get("tweet")?.toString() };
  const result = await tweetSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          userId: session.id,
        },
        select: {
          id: true,
        },
      });

      redirect(`/tweets/${tweet.id}`);
    }
  }
}
