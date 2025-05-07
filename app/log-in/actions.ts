"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      (email) => email.endsWith("@zod.com"),
      "Only @zod.com emails are allowed"
    )
    .refine(checkEmailExists, "An account with this email does not exists."),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Password should be at least ${PASSWORD_MIN_LENGTH} character long.`
    )
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

interface ActionState {
  success: boolean;
}

export async function loginForm(prevState: ActionState, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten(),
    };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data?.email,
      },
      select: {
        password: true,
        id: true,
      },
    });

    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        success: false,
        error: {
          fieldErrors: {
            email: [],
            password: ["Wrong password"],
          },
        },
      };
    }
  }
}
