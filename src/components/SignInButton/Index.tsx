import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { Login } from "./Login";
import { Logout } from "./Logout";

export const SignInButton = () => {
  const { session } = useContext(UserContext);
  const [user, setUser] = useState<string>("");

  console.log("Entrada signin button");
  console.log(session);

  useEffect(() => {
    console.log(`signin`);
    console.log(session);
    setUser(session.name);
  }, [session]);

  return <>{user ? <Logout user={user} /> : <Login />}</>;
};
