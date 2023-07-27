"use client";
import React from "react";
import styles from "./BoardList.module.css";
import Link from "next/link";

function BoardList() {
  return (
    <nav>
      <ul className={styles.boardList}>
        <Link href="./Board" className={styles.boardLink}>
          자유
        </Link>

        <span className={styles.bar}></span>

        <Link href="./Board" className={styles.boardLink}>
          지식
        </Link>

        <Link href="./Board" className={styles.boardLink}>
          QnA
        </Link>

        <span className={styles.bar}></span>

        <Link href="./Board" className={styles.boardLink}>
          홍보
        </Link>

        <Link href="./Board" className={styles.boardLink}>
          취업/진로
        </Link>

        <span className={styles.bar}></span>

        <Link href="./Board" className={styles.boardLink}>
          취미
        </Link>
      </ul>
    </nav>
  );
}

export default BoardList;
