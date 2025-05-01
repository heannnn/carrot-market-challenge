import { FireIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
//import "@/lib/db";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen">
      <div className="flex justify-center items-center gap-3">
        <FireIcon className="size-14 text-rose-400" />
        <span className="text-center font-extrabold text-4xl">Welcome</span>
        <FireIcon className="size-14 text-rose-400" />
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link className="primary-btn py-2.5 text-lg" href="/create-account">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/log-in" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
