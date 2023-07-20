"use client";

import React, { ReactElement } from "react";
import classes from "./SearchAccount.module.css";
import AppImg from "./img/Icon.png";
import Link from "next/link";
import Image from "next/image";

export default function SearchAccount(): ReactElement {
  return (
    <div>
      <div className={classes.outer}>
        <p>
          <Image src={AppImg} className={classes.image} />
        </p>
        <p className={classes.header}>비밀번호 찾기</p>
        <p className={classes.text}>
          회원 가입시 입력하신 이메일 주소와 학번을 입력하시면,
          <br /> 해당 이메일로 비밀번호 변경 링크를 보내드립니다.
        </p>
        <input
          type="text"
          placeholder="이메일 주소를 입력하세요"
          className={classes.Input}
        />
        <br />
        <input
          type="text"
          placeholder="학번을 입력하세요"
          className={classes.Input}
        />
        <br />
        <Link href="/">
          <button type="button" id="cancel" className={classes.cancel}>
            취소
          </button>
        </Link>
        <Link href="/">
          <button type="button" id="search" className={classes.search}>
            비밀번호 찾기
          </button>
        </Link>
      </div>
    </div>
  );
}
