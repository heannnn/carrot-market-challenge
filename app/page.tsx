"use client";

import Input from "@/components/input";
import { useFormState } from "react-dom";
import { loginForm } from "./actions";
import Button from "@/components/button";
import { FireIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const initialState = {
  success: false,
  error: {},
};

export default function Home() {
  const [state, dispatch] = useFormState(loginForm, initialState);
  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen *:w-full ">
      <FireIcon className="size-14 text-rose-400" />
      <form action={dispatch} className="flex flex-col *:py-5">
        <Input
          type="email"
          placeholder="Email"
          required={true}
          name="email"
          errors={state?.error?.fieldErrors}
        />
        <Input
          type="text"
          placeholder="Username"
          required={true}
          name="username"
          errors={state?.error?.fieldErrors}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          name="password"
          errors={state?.error?.fieldErrors}
        />
        <Button text="Log In" />
      </form>
      {state?.success ? (
        <div className="bg-green-600 flex items-center px-2 gap-3 h-14 rounded-2xl ring-4 ring-green-400">
          <CheckCircleIcon className="size-6" />
          <span>Welcome back!</span>
        </div>
      ) : null}
    </div>
  );
}
