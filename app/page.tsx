"use client";

import Image from "next/image";
import Link from "next/link";
import classes from "./page.module.css";
import IconImg from "./img/Icon.png";
import AppImg from "./img/loginAppImg.png";
import { ReactElement, useEffect, useState } from "react";
import { headers } from "next/dist/client/components/headers";
import { useRouter } from "next/navigation";
import sha512 from "crypto-js/sha512";
import useLocalStorage from "./useLocalStorage";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const { value: token, setStoredValue: setToken } = useLocalStorage(
    "token",
    ""
  );
  const { value: privKey, setStoredValue: setPrivKey } = useLocalStorage(
    "privKey",
    ""
  );
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
    if (
      token &&
      token !== "" &&
      privKey &&
      privKey !== "" &&
      userData !== "{}"
    ) {
      location.href = "/Main/MainPage";
    }
  }, [userData]);

  const handleLogin = async (pubkey: string, privkey: string) => {
    try {
      const response = await fetch(
        "https://dev.api.tovelop.esm.kr/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: pubkey, password: privkey }),
        }
      );
      const data = await response.json();
      console.log("=====", data);

      if (data["pubKey"] && data["privKey"]) {
        setToken(data["pubKey"]);
        setPrivKey(data["privKey"]);

        const timestamp = Math.floor(Date.now() / 1000);
        const storedprivKey = data["privKey"];
        const sign = sha512(timestamp + storedprivKey).toString();

        await fetch("https://dev.api.tovelop.esm.kr/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth": data["pubKey"], // 토큰 값 추가
            "x-timestamp": timestamp.toString(), // 현재 unix timestamp 값 추가
            "x-sign": sign, // sha512로 생성한 서명 값 추가
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setUserData(res.data);
              router.push("/Main/MainPage");
            }
          })
          .catch((error) => {
            console.log("유저 정보 가져오기 실패:", error.message);
          });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("로그인 실패");
    }
  };

  const handleLoginButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };
  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };
  return (
    <div className={classes.outer}>
      <div className={classes.appImg}>
        <Image src={AppImg} alt="" />
      </div>
      <div className={classes.LoginPage}>
        <div className={classes.img}>
          <Image src={IconImg} alt="" fill />
        </div>

        <h4 style={{ margin: 0 }}>과끼리에 오신 것을 환영합니다!</h4>

        <form action="submit" onSubmit={submitEvent} className={classes.form}>
          <input
            type="text"
            className={classes.Input}
            placeholder="아이디"
            value={email}
            onChange={onEmail}
          />
          <input
            type="password"
            className={classes.Input}
            placeholder="비밀번호"
            value={password}
            onChange={onpassword}
          />
          <button
            type="submit"
            className={classes.button}
            onClick={handleLoginButton}
          >
            로그인
          </button>
        </form>

        <h4 className={classes.text}>
          비밀번호를 잊어버렸나요?
          <Link href="/SearchAccount" className={classes.link}>
            비밀번호찾기
          </Link>
        </h4>
        <h4 className={classes.text}>
          아직 회원이 아니신가요?{" "}
          <Link href="/Agree" className={classes.link}>
            회원가입
          </Link>
        </h4>
      </div>
    </div>
  );
}
