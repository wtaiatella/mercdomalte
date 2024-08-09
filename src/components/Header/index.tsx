import { Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent } from "react";
import { SignInButton } from "../SignInButton/Index";
import { Container } from "./styles";

const { Search } = Input;

export function Header() {
  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    console.log(event.target.value);
  };

  return (
    <Container>
      <Link href="/" className="logo">
        <Image
          src="/images/logo.png"
          alt="logo Mercado do Malte"
          width="107"
          height="87"
        />
      </Link>

      <Search
        className="busca"
        placeholder="Procure seu arquivo"
        allowClear
        onChange={onSearch}
      />
      <div className="signin">
        <SignInButton />
      </div>
    </Container>
  );
}
