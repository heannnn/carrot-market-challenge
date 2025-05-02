"use client";

import { useState, useTransition } from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { toggleLike } from "@/app/(tweet)/tweets/[id]/actions";

interface LikeButtonProps {
  tweetId: number;
  userId: number;
  isLiked: boolean;
  likeCount: number;
}

export function LikeButton({
  tweetId,
  userId,
  isLiked: initialIsLiked,
  likeCount: initialCount,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await toggleLike({ tweetId, userId, isLiked });
      setIsLiked((prev) => !prev);
      setCount((prev) => prev + (isLiked ? -1 : 1));
    });
  };

  return (
    <div className="flex items-center gap-1 text-black cursor-pointer">
      <button type="button" onClick={onClick}>
        {isLiked ? (
          <SolidHeartIcon className="size-5 text-rose-500" />
        ) : (
          <OutlineHeartIcon className="size-5 text-neutral-400" />
        )}
      </button>
      <span
        className={`text-sm ${isLiked ? "text-rose-500" : "text-neutral-400"}`}
      >
        {count}
      </span>
    </div>
  );
}
