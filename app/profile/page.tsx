import Button from "@/components/button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }

  notFound();
}

export default async function Profile() {
  const user = await getUser();

  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };

  return (
    <div className="flex flex-col gap-10 m-10">
      <h1 className="text-center font-extrabold text-6xl">Profile Page</h1>
      <div className="flex flex-col gap-5 *:text-xl">
        <div className="flex justify-between">
          <span>User Name</span>
          <div>{user.username}</div>
        </div>
        <div className="flex justify-between">
          <span>User Email</span>
          <div>{user.email}</div>
        </div>
        <div>
          <form action={logout}>
            <Button text="Log out" />
          </form>
        </div>
      </div>
    </div>
  );
}
