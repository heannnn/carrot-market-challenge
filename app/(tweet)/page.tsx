import TweetList from "@/components/tweets-list";
import { Prisma } from "@prisma/client";
import { getTweets, getTweetsLength } from "./actions";

export type InitialTweets = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const initialTweets = await getTweets(0);
  const pages = await getTweetsLength();

  return (
    <div className="flex flex-col">
      <TweetList initialTweets={initialTweets} pages={pages} />
    </div>
  );
}
