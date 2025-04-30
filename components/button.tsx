"use client";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({
  text,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  // 이 함수가 끝나는지 상태를 알려줌, 이 hook은 form의 자식요소에서만 사용되어야함.
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`primary-btn h-16 ${rest?.className ?? ""}`}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
