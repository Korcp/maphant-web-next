"use client";
import React, { ReactElement, useState } from "react";
import Link from "next/link";

import MainHeader from "../MainPage/Header/MainHeader";
import styles from "./MypagePW.module.css";

import { MdSearch, MdSort, MdArrowBack, MdArrowForward } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
function page() {
  const router = useRouter();

  const [pw, setPw] = useState("");

  const onpw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passValue = e.target.value;
    setPw(passValue);
  };

  const pwcheck = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth", "maphant@pubKey");
    myHeaders.append("x-timestamp", "100");
    myHeaders.append("x-sign", "maphant@privKey");
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
