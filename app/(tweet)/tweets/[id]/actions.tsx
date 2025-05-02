"use server";
import db from "@/lib/db";

export async function toggleLike({
  tweetId,
  userId,
  isLiked,
}: {
  tweetId: number;
  userId: number;
  isLiked: boolean;
}) {
  if (isLiked) {
    await db.like.deleteMany({ where: { tweetId, userId } });
  } else {
    await db.like.create({ data: { tweetId, userId } });
  }
}
