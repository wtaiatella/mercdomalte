import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { LogoutBlock } from "./styles";

export const Logout = ({ user }: { user: string }) => {
  const router = useRouter();
  const { session, setSession } = useContext(UserContext);

  const handleMyAccount = () => {
    console.log("botão my account");
    console.log(session);
    router.push("/myaccount");
  };

  const handleLogout = () => {
    const accesToken = "";
    const email = "";
    const name = "";
    const code = 0;

    setSession({
      accesToken,
      email,
      name,
      code,
    });

    localStorage.setItem("token", accesToken);
    router.push("/");
  };

  return (
    <LogoutBlock>
      <div className="user-wrapper">
        <p className="user-name">{user}</p>
        <div>
          <button onClick={handleMyAccount} className="user-button">
            Minha conta
          </button>
          <span>|</span>
          <button onClick={handleLogout} className="user-button">
            {" "}
            Sair
          </button>
        </div>
      </div>
      <AiOutlineUser />
    </LogoutBlock>
  );
};
