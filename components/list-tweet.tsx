import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface ListTweetProps {
  tweet: string;
  id: number;
  created_at: Date;
  user: {
    id: number;
    username: string;
  };
}

export default function ListTweet({
  tweet,
  id,
  created_at,
  user,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <div className="flex flex-col gap-2 px-4 py-3 border mt-5 border-neutral-200 hover:bg-neutral-50 transition">
        <div className="flex justify-between items-center text-sm text-neutral-500">
          <span>@{user.username}</span> {/* 실제로는 작성자 정보로 대체 */}
          <span>{formatToTimeAgo(created_at.toString())}</span>
        </div>
        <p className="text-base text-black">{tweet}</p>
      </div>
    </Link>
  );
}
