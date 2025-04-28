"use server";
import { z } from "zod";

const passwordRegex = /(?=.*?[0-9])/;

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      (email) => email.endsWith("@zod.com"),
      "Only @zod.com emails are allowed"
    ),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z
    .string()
    .min(10, "Password should be at least 10 character long.")
    .regex(
      passwordRegex,
      "Password should contain at least one number (0123456789)."
    ),
});

interface ActionState {
  success: boolean;
}

// /login/page.tsx는 client component이므로 handleForm을 login/page.tsx에 정의할 수 없다.
export async function loginForm(prevState: ActionState, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return {
      success: false,
      error: result.error.flatten(),
    };
  } else {
    return {
      success: true,
      error: {
        fieldErrors: {
          email: [],
          username: [],
          password: [],
        },
      },
    };
  }
}
