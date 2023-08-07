"use client";
import React, { forwardRef } from "react";
import styles from "./DropdwonMenu.module.css";
import Link from "next/link";

const DropdownMenu = () => {
  return (
    <ul className={styles.menulist}>
      <Link href="/Main/MypagePW" className={styles.userInfo}>회원 정보</Link>
      <li className={styles.history}>활동 내역</li>
      <li className={styles.logout}>로그아웃</li>
    </ul>
  );
};

export default DropdownMenu;
