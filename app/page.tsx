"use client";

import Image from "next/image";
import Link from "next/link";
import classes from "./page.module.css";
import IconImg from "./img/Icon.png";
import AppImg from "./img/loginAppImg.png";
import { ReactElement, useEffect, useState } from "react";
import { headers } from "next/dist/client/components/headers";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const onEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const onpassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passValue = e.target.value;
    setPassword(passValue);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const privKey = localStorage.getItem("privKey");

    if (token && privKey && token != null && privKey != null) {
      router.push("/Main/MainPage");
    }
  }, [router]);

  const handleLogin = async (pubkey: string, privkey: string) => {
    try {
      const response = await fetch(
        "https://dev.api.tovelop.esm.kr/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth": pubkey,
            "x-timestamp": "1234",
            "x-sign": "maphant@privkey",
          },
          body: JSON.stringify({ email: pubkey, password: privkey }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data["pubKey"] && data["privKey"]) {
        localStorage.setItem("token", data["pubKey"]);
        localStorage.setItem("privKey", data["privKey"]);
        // Redirect to the main page after successful login
        router.push("/Main/MainPage");
      } else {
        if (email == null && password == null) {
          alert("아이디와 비밀번호를 입력하여주세요");
        } else {
          alert("아이디와 비밀번호를 알맞게 입력하여주세요");
        }
      }
    } catch (error) {
      console.log("로그인 실패:", error.message);
    }
  };

  const handleLoginButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };
  return (
    <div className={classes.outer}>
      <div className={classes.appImg}>
        <Image src={AppImg} alt="" />
      </div>
      <div className={classes.LoginPage}>
        <h1>
          <Image src={IconImg} alt="" />
        </h1>
        <p>과끼리에 오신 것을 환영합니다!</p>
        <input
          type="text"
          name="ID"
          id=""
          className={classes.Input}
          placeholder="아이디"
          value={email}
          onChange={onEmail}
        />
        <br />
        <input
          type="password"
          name="password"
          className={classes.Input}
          placeholder="비밀번호"
          value={password}
          onChange={onpassword}
        />
        <br />
        <button
          type="submit"
          id="LoginBtn"
          className={classes.button}
          onClick={handleLoginButton}
        >
          로그인
        </button>

        <br />
        <p className={classes.foundPwd}>
          비밀번호를 잊어버렸나요?
          <Link href="/SearchAccount">비밀번호찾기</Link>
        </p>
        <br />
        <p className="new">
          아직 회원이 아니신가요? <Link href="/Agree">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
