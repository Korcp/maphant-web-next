import React from "react";
import Link from "next/link";

import styles from "./Mypage.module.css";

function page() {
  return (
    <div className={styles.boardLayout}>
      <div className={styles.infor}>회원정보</div>

      <div className={styles.nickname}>닉네임 변경</div>

      <input
        type="text"
        className={styles.nicknametype}
        placeholder="닉네임"
      ></input>

      <div className={styles.name}>이름</div>
      <input
        type="text"
        className={styles.nametype}
        placeholder="아이디"
      ></input>

      <div className={styles.password}>현재 비밀번호</div>

      <input
        type="text"
        className={styles.passwordtype}
        placeholder="현재 비밀번호"
      ></input>

      <div className={styles.password1}>
        <div className={styles.passwordword}>새로운 비밀번호 </div>
        <div className={styles.passwordword11}>(영문 숫자 특수문자 8~20자)</div>
      </div>

      <input
        type="text"
        className={styles.passwordcheck}
        placeholder="새로운 비밀번호"
      ></input>

      <div className={styles.password1}>
        <div className={styles.passwordword}>비밀번호 확인</div>
        <div className={styles.passwordword11}></div>
      </div>

      <input
        type="password"
        className={styles.passwordcheck}
        placeholder="비밀번호확인"
      ></input>

      <div className={styles.phoneNum}>휴대폰 번호 수정</div>
      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.phonecheck}
          placeholder="휴대폰번호 입력"
        ></input>
        <button className={styles.phoneBtn}>인증번호 받기</button>
      </div>

      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.phonecheck}
          placeholder="인증번호 입력"
        ></input>
        <button className={styles.phoneBtn}>인증하기</button>
      </div>

      <div className={styles.email}>이메일 정보</div>
      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="이메일 입력"
        ></input>
        <button className={styles.emailBtn}>인증하기</button>
      </div>

      <div className={styles.end}>
        <button className={styles.delaccount}>계정 탈퇴</button>
        <button className={styles.save}>저장하기</button>
      </div>
    </div>
  );
}

export default page;
