export const dynamic = "force-dynamic";

import Button from "@/components/button";
import { LikeButton } from "@/components/like-button";
import RefreshOnMount from "@/components/refresh-on-mount";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatTweetDate } from "@/lib/utils";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          bio: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  return tweet;
}

async function getIsLike(tweetId: number, userId: number) {
  const like = await db.like.findFirst({
    where: {
      tweetId,
      userId,
    },
  });

  return !!like; // 존재 여부를 boolean으로 반환
}

export default async function Tweet({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  const session = await getSession();
  const userId = session.id!;
  const isLike = await getIsLike(id, userId);

  return (
    <>
      <div className="max-w-xl m-10 px-4 py-6 border border-neutral-200">
        <div className="mb-2">
          <div className="text-lg font-semibold">@{tweet.user.username}</div>
          {tweet.user.bio && (
            <div className="text-sm text-neutral-500">{tweet.user.bio}</div>
          )}
        </div>
        <div className="text-xl mb-4 whitespace-pre-wrap">{tweet.tweet}</div>
        <div className="text-sm text-neutral-500 border-t border-neutral-200 py-4 space-y-3">
          <div>{formatTweetDate(tweet.updated_at)}</div>
        </div>
        <div className="flex justify-between items-center text-sm text-neutral-500 border-t border-neutral-200 py-4 space-y-3">
          <div className="flex items-center gap-1 text-black cursor-pointer">
            <button type="button">
              <ChatBubbleOvalLeftIcon className="size-5 text-neutral-400" />
            </button>
            <span className="text-sm text-neutral-400">0</span>
          </div>
          <LikeButton
            tweetId={id}
            userId={userId}
            isLiked={isLike}
            likeCount={tweet._count.likes}
          />
        </div>
        <div className="flex w-full justify-between border-t border-neutral-200 pt-4 space-y-3">
          <input
            className="text-sm w-full text-neutral-500 outline-none placeholder:text-neutral-500"
            placeholder="Post your reply"
          />
          <button className="bg-rose-400 text-white rounded-md px-3 py-1">
            Reply
          </button>
        </div>
      </div>
    </>
  );
}
