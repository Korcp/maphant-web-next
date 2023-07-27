"use client";

import Image from "next/image";
import Link from "next/link";
import classes from "./page.module.css";
import IconImg from "./img/Icon.png";
import AppImg from "./img/loginAppImg.png";
import { ReactElement, useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const onpassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passValue = e.target.value;
    setPassword(passValue);
  };

  const Loginpass = () => {
    fetch("https://dev.api.tovelop.esm.kr/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("오류 데이터 전송", error);
      });
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
        <Link href="Main/MainPage">
          <button
            type="submit"
            id="LoginBtn"
            className={classes.button}
            onClick={Loginpass}
          >
            로그인
          </button>
        </Link>

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
