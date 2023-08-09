"use client";

import React from "react";

import styles from "./Mypage.module.css";
import { useRouter } from "next/navigation";
import UserStorage from "@/lib/storage/UserStorage";

function Page() {
  const router = useRouter();

  const Logout = () => {
    UserStorage.clear();

    router.push("/");
  };
  return (
    <div className={styles.container}>
      <section className={styles.userInfo}>
        <h2 className={styles.sectionTitle}>내 정보</h2>
        <div className={styles.userDetails}>
          <section className={styles.profileSection}>
            <img
              src="user-profile.jpg"
              alt="User Profile"
              className={styles.profileImage}
            />
            <div className={styles.profileLabels}>
              <label>아이디</label>
              <label>이름/닉네임</label>
              <label>학교/학과</label>
            </div>
          </section>
          <label>소개글 :</label>
        </div>
      </section>
      <section className={styles.accountSettings}>
        <h2 className={styles.own}>계정</h2>
        <div className={styles.profileLabels}>
          <label>내 정보 수정</label>
          <br />
          <label>비밀번호 수정</label>
          <br />
          <label>계열 학과 수정</label>
        </div>
      </section>
      <section className={styles.communitySettings}>
        <h2>커뮤니티 설정</h2>
        <div className={styles.profileLabels}>
          <label>내 게시판</label>
          <br />
          <label>즐겨찾기 한 게시판</label>
          <br />
          <label>작성한 댓글 목록</label>
        </div>
      </section>
      <section className={styles.etc}>
        <h2>기타</h2>
        <div className={styles.profileLabels}>
          <label>회원 탈퇴</label>
          <br />
          <label onClick={Logout}>로그아웃</label>
        </div>
      </section>
    </div>
  );
}

export default Page;
