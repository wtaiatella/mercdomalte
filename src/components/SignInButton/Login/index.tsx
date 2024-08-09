import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import styled from "styled-components";

const LoginLink = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: rgba(110, 52, 53, 1);
  grid-area: singin;

  :hover {
    color: rgba(110, 52, 53, 0.3);
  }

  svg {
    margin-left: 1rem;
    font-size: 1.5rem;
    align-items: center;
  }
`;

export const Login = () => {
  return (
    <LoginLink>
      <Link href="/login">
        Entrar
        <AiOutlineUser />
      </Link>
    </LoginLink>
  );
};
