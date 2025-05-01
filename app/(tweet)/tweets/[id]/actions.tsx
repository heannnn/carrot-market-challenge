"use server";
import db from "@/lib/db";

export async function toggleLike({
  tweetId,
  userId,
}: {
  tweetId: number;
  userId: number;
}) {
  const existing = await db.like.findFirst({
    where: { tweetId, userId },
  });

  if (existing) {
    await db.like.delete({
      where: { id: existing.id },
    });
  } else {
    await db.like.create({
      data: { tweetId, userId },
    });
  }
}
