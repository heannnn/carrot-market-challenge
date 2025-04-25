"use client";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  // 이 함수가 끝나는지 상태를 알려줌, 이 hook은 form의 자식요소에서만 사용되어야함.
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-neutral-100 rounded-full h-16 text-neutral-500 font-semibold my-2"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
