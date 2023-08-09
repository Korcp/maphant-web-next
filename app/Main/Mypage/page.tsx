"use client";
import sha512 from "crypto-js/sha512";
import React, { useEffect, useState } from "react";

import useLocalStorage from "@/app/useLocalStorage";

import styles from "./Mypage.module.css";
import UserStorage from "@/lib/storage/UserStorage";
import UserAPI from "@/lib/api/UserAPI";

function page() {
  const [userData, setUserData] = useState(UserStorage.getUserProfile()!!);

  // 닉네임 변경
  const NicknameChange = (newNickname: string) => {
    console.log(newNickname);
    setUserData((prevUserData) => ({
      ...prevUserData,
      nickname: newNickname,
    }));
  };

  // 닉네임 수정
  const handleNicknameUpdate = () => {
    UserAPI.updateUserNickname(userData.nickname)
      .then(() => alert("닉네임이 수정되었습니다"))
      .catch((err) => alert(err));
  };

  // 정보 불러오기
  useEffect(() => {
    UserAPI.getMyProfile()
      .then((res) => {
        setUserData(res.data);
        UserStorage.setUserProfile(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  console.log(userData);
  return (
    <div className={styles.boardLayout}>
      <div className={styles.infor}>회원정보</div>

      <div className={styles.email}>프로필</div>
      <div className={styles.emailcheck}>
        <form>
          <img src={userData.profileImg} alt={userData.profileImg}></img>
        </form>
        <button className={styles.emailBtn}>그림수정</button>
      </div>

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
          defaultValue={userData.studentNo}
          readOnly
        ></input>
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
