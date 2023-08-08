"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import sha512 from "crypto-js/sha512";
import styles from "./Mypage.module.css";
import useLocalStorage from "@/app/useLocalStorage";

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

  const { value: privKey } = useLocalStorage("privKey", "");
  const { value: token } = useLocalStorage("token", "");
  const timestamp = Math.floor(Date.now() / 1000);
  const sign = sha512(timestamp + privKey).toString();

  // 닉네임 변경
  const NicknameChange = (newNickname: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      nickname: newNickname,
    }));
  };

  // 닉네임 수정
  const handleNicknameUpdate = () => {
    const updatedData = {
      ...userData,
      nickname: userData.nickname, // 변경된 닉네임으로 업데이트
    };

    var myHeaders = new Headers();
    myHeaders.append("x-auth", token);
    myHeaders.append("x-timestamp", timestamp.toString());
    myHeaders.append("x-sign", sign);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions1: Object = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(updatedData),
      redirect: "follow",
    };

    fetch(
      "https://dev.api.tovelop.esm.kr/user/changeinfo/nickname",
      requestOptions1
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("수정완료되었습니다.");
        } else {
          alert(res.errors);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // 정보 불러오기
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth", token);
    myHeaders.append("x-timestamp", timestamp.toString());
    myHeaders.append("x-sign", sign);
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
        setUserData(res.data);
        console.log(res.data);
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
          value={userData.nickname || ""}
          onChange={(e) => NicknameChange(e.target.value)}
        ></input>
        <button
          type="submit"
          className={styles.emailBtn}
          onClick={handleNicknameUpdate}
        >
          수정하기
        </button>
      </div>

      <div className={styles.name}>이름</div>
      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          placeholder="이름"
          value={userData.name || ""}
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
          defaultValue={userData.phNum}
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
          defaultValue={userData.email}
          readOnly
        ></input>
      </div>

      <div className={styles.email}>학번</div>
      <div className={styles.emailcheck}>
        <input
          type="text"
          className={styles.emailtype}
          defaultValue={userData.sno}
          readOnly
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
