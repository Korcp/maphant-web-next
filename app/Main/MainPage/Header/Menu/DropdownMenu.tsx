"use client";
import React, { forwardRef, useReducer } from "react";
import styles from "./DropdwonMenu.module.css";
import { useRouter } from "next/navigation";

const DropdownMenu = () => {
  const router = useRouter();

  const Logout = () => {
    localStorage.clear();

    router.push("/");
  };

  return (
    <ul className={styles.menulist}>
      <li className={styles.userInfo}>회원 정보</li>
      <li className={styles.history}>활동 내역</li>
      <li className={styles.logout} onClick={Logout}>
        로그아웃
      </li>
    </ul>
  );
};

export default DropdownMenu;
