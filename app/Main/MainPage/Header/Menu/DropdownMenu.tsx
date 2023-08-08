"use client";
import React, { forwardRef, useReducer } from "react";
import styles from "./DropdwonMenu.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/app/useLocalStorage";

const DropdownMenu = () => {
  const router = useRouter();

  const { value: token, setStoredValue: setToken } = useLocalStorage(
    "token",
    ""
  );
  const { value: privKey, setStoredValue: setPrivKey } = useLocalStorage(
    "privKey",
    ""
  );

  const Logout = () => {
    setToken("");
    setPrivKey("");
    localStorage.clear();

    router.push("/");
  };
  return (
    <ul className={styles.menulist}>
      <Link href="/Main/MypagePW" className={styles.userInfo}>
        회원 정보
      </Link>
      <li className={styles.history}>활동 내역</li>
      <li className={styles.logout} onClick={Logout}>
        로그아웃
      </li>
    </ul>
  );
};

export default DropdownMenu;
