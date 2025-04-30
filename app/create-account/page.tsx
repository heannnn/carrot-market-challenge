"use client";

import Input from "@/components/input";
import { useFormState } from "react-dom";
import Button from "@/components/button";
import { FireIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { createAccountForm } from "./actions";

const initialState = {
  success: false,
  error: {
    fieldErrors: {
      email: [],
      username: [],
      password: [],
    },
  },
};

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccountForm, null);
  console.log("state:", state);
  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen *:w-full ">
      <FireIcon className="size-14 text-rose-400" />
      <form action={dispatch} className="flex flex-col *:py-5">
        <Input
          type="text"
          placeholder="Email"
          required={true}
          name="email"
          errors={state?.error?.fieldErrors?.email}
        />
        <Input
          type="text"
          placeholder="Username"
          required={true}
          name="username"
          errors={state?.error?.fieldErrors?.username}
        />
        <Input
          type="password"
          placeholder="Password"
          required={true}
          name="password"
          errors={state?.error?.fieldErrors?.password}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          required={true}
          name="confirm_password"
          errors={state?.error?.fieldErrors?.confirm_password}
        />
        <Button text="Create Account" />
      </form>
      {state?.success ? (
        <div className="bg-green-600 flex items-center px-2 gap-3 h-14 rounded-2xl ring-4 ring-green-400">
          <CheckCircleIcon className="size-6" />
          <span>Success Log in</span>
        </div>
      ) : null}
    </div>
  );
}
