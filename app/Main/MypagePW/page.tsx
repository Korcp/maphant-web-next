"use client";
import React, { ReactElement, useState } from "react";
import Link from "next/link";

import MainHeader from "../MainPage/Header/MainHeader";
import styles from "./MypagePW.module.css";

import { MdSearch, MdSort, MdArrowBack, MdArrowForward } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import sha512 from "crypto-js/sha512";
import useLocalStorage from "@/app/useLocalStorage";
function page() {
  const router = useRouter();

  const [pw, setPw] = useState("");

  const onpw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passValue = e.target.value;
    setPw(passValue);
  };

  const { value: privKey } = useLocalStorage("privKey", "");
  const { value: token } = useLocalStorage("token", "");
  const timestamp = Math.floor(Date.now() / 1000);
  const sign = sha512(timestamp + privKey).toString();

  const pwcheck = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth", token);
    myHeaders.append("x-timestamp", timestamp.toString());
    myHeaders.append("x-sign", sign);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      password: pw,
    });

    const requestOptions: object = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://dev.api.tovelop.esm.kr/user/changeinfo/identification",
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          router.push("/Main/Mypage");
        } else {
          alert(result.errors);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className={styles.boardLayout}>
      <div className={styles.inforcheck}>본인확인</div>
      <div className={styles.tagpw}>계정 비밀번호</div>
      <input
        type="password"
        className={styles.pw}
        placeholder="계정 비밀번호"
        value={pw}
        onChange={onpw}
      ></input>

      <button type="submit" className={styles.linktext} onClick={pwcheck}>
        확 인
      </button>
    </div>
  );
}

export default page;
