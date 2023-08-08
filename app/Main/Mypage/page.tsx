"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./Mypage.module.css";

function page() {
  const [userData, setUserData] = useState({
    id: null,
    univId: null,
    email: "",
    password: "",
    nickname: "",
    name: "",
    sno: "",
    phNum: "",
    state: 0,
    role: "",
    agreedAt: null,
    createdAt: "",
    lastmodifiedAt: "",
  });

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth", "maphant@pubKey");
    myHeaders.append("x-timestamp", "100");
    myHeaders.append("x-sign", "maphant@privKey");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({});

    var requestOptions: Object = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://dev.api.tovelop.esm.kr/user/changeinfo/olddata",
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        setUserData(res.data), console.log(res.data);
      })
      .catch((error) => console.log("error", error));
  }, []);
  console.log(userData);
  return (
    <div className={styles.boardLayout}>
      <div className={styles.infor}>회원정보</div>

      <div className={styles.nickname}>닉네임 변경</div>

      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="닉네임"
          value={userData.nickname}
        ></input>
        <button type="submit" className={styles.emailBtn}>
          수정하기
        </button>
      </div>

      <div className={styles.name}>이름</div>
      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="이름"
          value={userData.name}
        ></input>
        <button type="submit" className={styles.emailBtn}>
          수정하기
        </button>
      </div>
      <div className={styles.password1}>
        <div className={styles.passwordword}>
          새로운 비밀번호(영문 숫자 특수문자 8~20자){" "}
        </div>
      </div>

      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="새로운 비밀번호"
        ></input>
      </div>

      <div className={styles.password1}>
        <div className={styles.passwordword}>비밀번호 확인</div>
        <div className={styles.passwordword11}></div>
      </div>

      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="위의 비밀번호와 동일하게 작성"
        ></input>
        <button type="submit" className={styles.emailBtn}>
          수정하기
        </button>
      </div>

      <div className={styles.phoneNum}>휴대폰 번호 수정</div>
      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="휴대폰 번호"
          value={userData.phNum}
        ></input>
        <button type="submit" className={styles.emailBtn}>
          수정하기
        </button>
      </div>

      <div className={styles.email}>이메일 정보</div>
      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="이메일 입력"
          value={userData.email}
        ></input>
      </div>

      <div className={styles.email}>학번</div>
      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="임시 전공"
          value={userData.sno}
        ></input>
      </div>

      <div className={styles.email}>학과계열</div>
      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="이메일 입력"
        ></input>
        <button className={styles.emailBtn}>추가하기</button>
      </div>

      <div className={styles.email}>전공</div>
      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="임시 전공"
        ></input>
        <button type="submit" className={styles.emailBtn}>
          추가하기
        </button>
      </div>

      <div className={styles.end}>
        <button className={styles.delaccount}>계정 탈퇴</button>
        <button type="submit" className={styles.save}>
          저장하기
        </button>
      </div>
    </div>
  );
}

export default page;
