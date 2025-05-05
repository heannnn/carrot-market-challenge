"use client";

import { PhotoIcon } from "@heroicons/react/24/outline";
import { submitTweet } from "./actions";
import { useFormState } from "react-dom";
import Button from "@/components/button";

export default function AddTweet() {
  const [state, action] = useFormState(submitTweet, null);
  return (
    <div className="border p-5 mt-3">
      <form action={action}>
        <div className="m-10">
          <textarea
            className="border-none resize-none outline-none w-full h-full"
            name="tweet"
            rows={6}
            maxLength={280}
            placeholder="What's happening?"
          ></textarea>
          {state?.fieldErrors?.tweet &&
            state.fieldErrors.tweet.map((err: string, idx: number) => (
              <span key={idx} className="text-sm text-rose-500">
                {err}
              </span>
            ))}
        </div>
        <div className="flex justify-end">
          {/* <div>
            <label htmlFor="photo">
              <PhotoIcon className="w-7 text-blue-500" />
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              className="hidden"
            ></input>
          </div> */}
          <Button type="submit" text="Post" />
        </div>
      </form>
    </div>
  );
}
