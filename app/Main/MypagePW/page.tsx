import React from "react";
import Link from "next/link";

import MainHeader from "../MainPage/Header/MainHeader";
import styles from "./MypagePW.module.css";

import { MdSearch, MdSort, MdArrowBack, MdArrowForward } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
function page() {
  return (
    <div className={styles.boardLayout}>
      <div className={styles.inforcheck}>본인확인</div>
      <div className={styles.tagpw}>계정 비밀번호</div>
      <input type="password" className={styles.pw} placeholder="계정 비밀번호"></input>
      
      <Link className={styles.linktext}  href="/Main/Mypage">
      확 인
      </Link>
      
    



    </div>
  );
}

export default page;