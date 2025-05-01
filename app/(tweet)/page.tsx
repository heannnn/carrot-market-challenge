import TweetList from "@/components/tweets-list";
import { Prisma } from "@prisma/client";
import { getTweets, getTweetsLength } from "./actions";
import RefreshOnMount from "@/components/refresh-on-mount";

export type InitialTweets = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const initialTweets = await getTweets(0);
  const pages = await getTweetsLength();

  return (
    <div className="flex flex-col">
      <RefreshOnMount />
      <TweetList initialTweets={initialTweets} pages={pages} />
    </div>
  );
}
