"use client";

import { InitialTweets } from "@/app/(tweet)/page";
import { useState } from "react";
import ListTweet from "./list-tweet";
import { getTweets } from "@/app/(tweet)/actions";
import { TWEET_PER_PAGE } from "@/lib/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface TweetsListProps {
  initialTweets: InitialTweets;
  pages: number;
}

export default function TweetList({ initialTweets, pages }: TweetsListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const pageCount = Math.ceil(pages / TWEET_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const LoadTweetByPage = async (page: number) => {
    setCurrentPage(page);
    const tweets = await getTweets(page);
    setTweets(tweets);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 border-black">
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 py-2">
        <button
          className="size-5"
          onClick={() =>
            currentPage > 0 ? LoadTweetByPage(currentPage - 1) : null
          }
        >
          <ChevronLeftIcon />
        </button>
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            className={`text-sm px-2 py-1 ${
              currentPage === i ? "underline font-semibold" : ""
            }`}
            onClick={() => LoadTweetByPage(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="size-5"
          onClick={() =>
            currentPage < pageCount - 1
              ? LoadTweetByPage(currentPage + 1)
              : null
          }
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
