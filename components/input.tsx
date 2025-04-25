import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { InputHTMLAttributes } from "react";
import { useState } from "react";

interface InputProps {
  name: string;
  errors?: Record<string, string[]>;
}

export default function Input({
  name,
  errors = {},
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const hasError = !!errors[name];
  const [focused, setFocused] = useState(false);

  const borderColor = hasError ? "border-rose-400" : "border-neutral-200";
  const ringColor = hasError ? "ring-rose-300" : "ring-neutral-400";

  const Icon =
    name === "password"
      ? KeyIcon
      : name === "email"
      ? EnvelopeIcon
      : name === "username"
      ? UserIcon
      : null;

  return (
    <div className="gap-2 flex flex-col">
      <div
        className={`flex items-center px-3 rounded-full gap-2 h-14 border-2 transition ${borderColor} ${
          focused ? `ring-2 ring-offset-2 ${ringColor} ring-offset-white` : ""
        }`}
      >
        {Icon && (
          <Icon
            className={`size-6 ${
              hasError ? "text-rose-400" : "text-neutral-500"
            }`}
          />
        )}
        <input
          name={name}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-describedby={`${name}-error`}
          className={`appearance-none border-none outline-none ring-0 shadow-none bg-transparent flex-1 h-full ${
            hasError
              ? "text-rose-500 placeholder:text-rose-300"
              : "placeholder:text-neutral-400"
          }`}
          {...rest}
        />
      </div>

      {hasError &&
        errors[name]?.map((error, index) => (
          <p
            key={index}
            id={`${name}-error`}
            className="text-rose-400 font-medium text-sm"
          >
            {error}
          </p>
        ))}
    </div>
  );
}
