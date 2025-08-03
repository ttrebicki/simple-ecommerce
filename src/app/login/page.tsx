import { getUserFromServerCookie } from "@/lib/api/firebase_admin";
import { Main } from "@/ui/layout/Main";
import Login from "@/ui/templates/Login";
import { Logout } from "@/ui/templates/Logout";

export default async function LoginPage() {
  const user = await getUserFromServerCookie();

  if (user)
    return (
      <Main>
        <h1>{"Already logged in"}</h1>
        <Logout />
      </Main>
    );

  return (
    <Main>
      <h1>{"Log In"}</h1>
      <Login />
    </Main>
  );
}
