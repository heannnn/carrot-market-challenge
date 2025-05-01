"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RefreshOnMount() {
  const router = useRouter();

  useEffect(() => {
    router.refresh(); // 서버 컴포넌트 강제 리렌더링
  }, []);

  return null;
}
