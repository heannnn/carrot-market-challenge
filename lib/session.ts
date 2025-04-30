import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default async function getSession() {
  return await getIronSession<SessionContent>(cookies(), {
    cookieName: "id",
    password: process.env.COOKIE_PASSWORD!,
  });
}
