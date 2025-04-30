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

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .refine(
        (email) => email.endsWith("@zod.com"),
        "Only @zod.com emails are allowed"
      ),
    username: z
      .string()
      .min(5, "Username should be at least 5 characters long."),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        "Password should be at least 10 character long."
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        "Password should be at least 10 character long."
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This Username is already taken.",
        fatal: true,
        path: ["username"],
      });

      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This Email is already exists.",
        fatal: true,
        path: ["email"],
      });

      return z.NEVER;
    }
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Both passwords should be the same",
    path: ["confirm_password"],
  });

export async function createAccountForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten(),
    };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/profile");
  }
}
