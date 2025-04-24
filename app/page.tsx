"use client";

import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import FormButton from "@/components/form-btn";
import { FireIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [state, action] = useFormState(handleForm, {
    email: "",
    name: "",
    password: "",
  });
  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen *:w-full ">
      <FireIcon className="size-14 text-rose-400" />
      <form action={action} className="flex flex-col *:py-5">
        <FormInput
          type="email"
          placeholder="Email"
          required={true}
          errors={[]}
          className="outline-none border-2 has-[:focus]:ring-neutral-400 has-[:focus]:ring-2 border-neutral-200"
          name="email"
        />
        <FormInput
          type="text"
          placeholder="Username"
          required={true}
          errors={[]}
          className="outline-none border-2 has-[:focus]:ring-neutral-400 has-[:focus]:ring-2 border-neutral-200"
          name="name"
        />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={state.errors ?? []}
          className={`${
            state?.errors
              ? "ring-2 ring-rose-400 focus:ring-2 focus:ring-rose-400 border-rose-200"
              : "outline-none border-2  has-[:focus]:ring-neutral-400 has-[:focus]:ring-2"
          }`}
          name="password"
        />
        <FormButton text="Log In" />
      </form>
      {state?.result === "success" && (
        <div className="bg-green-600 flex items-center px-2 gap-3 h-14 rounded-2xl ring-4 ring-green-400">
          <CheckCircleIcon className="size-6" />
          <span>Welcome back!</span>
        </div>
      )}
    </div>
  );
}
