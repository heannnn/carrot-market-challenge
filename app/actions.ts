"use server";

// /login/page.tsx는 client component이므로 handleForm을 login/page.tsx에 정의할 수 없다.
export async function handleForm(prevState: object, formData: FormData) {
  if (formData.get("password") !== "12345") {
    return {
      errors: ["Wrong password"],
    };
  } else {
    return {
      result: "success",
    };
  }
}
