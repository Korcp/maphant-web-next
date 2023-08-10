"use client";

import React, { useEffect, useState } from "react";

import styles from "./Mypage.module.css";
import { useRouter } from "next/navigation";
import UserStorage from "@/lib/storage/UserStorage";
import UserAPI from "@/lib/api/UserAPI";
import { text } from "stream/consumers";

function Page() {
  const router = useRouter();
  //userdata받아오기
  const [userData, setUserData] = useState(UserStorage.getUserProfile()!!);
  //모달 기능 구현
  const [mydataopen, setMydataOpen] = useState(false);
  const [pwopen, setPwOpen] = useState(false);
  const [cgopen, setCgOpen] = useState(false);
  //닉네임 저장소
  const [newNickname, setNewNickname] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwcheck, setNewPwCheck] = useState("");
  //비밀번호 눈깔
  const [showNewPw, setShowNewPw] = useState(false);
  const toggleShowNewPw = () => {
    setShowNewPw(!showNewPw);
  };

  //내 정보 수정 모달 열고 닫기
  const handlemydataopen = () => {
    setMydataOpen(true);
    setNewNickname(userData.nickname || "");
  };
  const handlemydataclose = () => {
    setMydataOpen(false);
  };
  //비밀번호 수정 모달 열고 닫기
  const handlepwopen = () => {
    setPwOpen(true);
  };
  const handlepwclose = () => {
    setPwOpen(false);
    setNewPw("");
    setNewPwCheck("");
  };
  // 전공 수정 모달 열고닫기
  const handlemycgopen = () => {
    setCgOpen(true);
  };
  const handlemycgclose = () => {
    setCgOpen(false);
  };
  //로그아웃 기능구현
  const Logout = () => {
    UserStorage.clear();

    router.push("/");
  };

  // 닉네임 변경
  const NicknameChange = (newNickname: string) => {
    setNewNickname(newNickname);
  };

  //비밀번호 입력 변경
  const PWChange = (newpw: string) => {
    setNewPw(newpw);
  };
  const PWCheckChange = (newpwcheck: string) => {
    setNewPwCheck(newpwcheck);
  };

  // 닉네임 수정
  const handleNicknameUpdate = () => {
    UserAPI.updateUserNickname(newNickname)
      .then(() => {
        alert("닉네임이 수정되었습니다.");
        setUserData((prevUserData) => ({
          ...prevUserData,
          nickname: newNickname,
        }));
        handlemydataclose();
      })

      .catch((err) => alert(err));
  };

  // 비밀번호 수정
  const handlePasswordUpdate = () => {
    UserAPI.updateUserPassWordModify(newPw, newPwcheck)
      .then((res) => {
        alert("비밀번호가 수정되었습니다.");
        handlepwclose();
      })
      .catch((err) => alert(err));
  };
  //회원 기존 정보 받아오기
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
            <div className={styles.userInfomation}>
              {userData && (
                <>
                  <label>아이디:{userData.email}</label>
                  <label>
                    이름 : {userData.name} / 닉네임:{userData.nickname}
                  </label>
                  {userData.category.map((item, index) => (
                    <label key={index}>
                      학과: {item.majorName} / 전공: {item.categoryName}
                    </label>
                  ))}
                </>
              )}
            </div>
          </section>
          <label>소개글 :</label>
        </div>
      </section>
      <section className={styles.accountSettings}>
        <h2 className={styles.own}>계정</h2>
        <div className={styles.list}>
          <label onClick={handlemydataopen}>내 정보 수정</label>
          <br />
          <label onClick={handlepwopen}>비밀번호 수정</label>
          <br />
          <label onClick={handlemycgopen}>계열 학과 수정</label>
          <br />
          <label>소개 글 수정</label>
        </div>
      </section>
      <section className={styles.communitySettings}>
        <h2>커뮤니티 </h2>
        <div className={styles.list}>
          <label>내 게시판</label>
          <br />
          <label>즐겨찾기 한 게시판</label>
          <br />
          <label>작성한 댓글 목록</label>
        </div>
      </section>
      <section className={styles.etc}>
        <h2>기타</h2>
        <div className={styles.list}>
          <label>회원 탈퇴</label>
          <br />
          <label onClick={Logout}>로그아웃</label>
        </div>
      </section>

      {mydataopen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>내 정보 수정</h2>
            <label>닉네임만 수정 가능합니다.</label>
            <br />
            <input
              className={styles.mydata}
              type="text"
              placeholder="이름"
              value={userData.name}
              readOnly
            />
            <input
              className={styles.mydata}
              type="text"
              placeholder="닉네임"
              value={newNickname}
              onChange={(e) => NicknameChange(e.target.value)}
            />
            <input
              className={styles.mydata}
              type="text"
              defaultValue={userData.studentNo}
              readOnly
            />
            <br />
            <button
              className={styles.mydatafix}
              type="submit"
              onClick={handleNicknameUpdate}
            >
              수정하기
            </button>
            <button className={styles.closebutton} onClick={handlemydataclose}>
              닫기
            </button>
          </div>
        </div>
      )}

      {pwopen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>비밀번호 수정</h2>
            <label>새 비밀번호와 비밀번호를 확인하여주세요</label>
            <br />
            <input
              className={styles.mydata}
              type={showNewPw ? "text" : "password"}
              placeholder="새 비밀번호"
              value={newPw}
              onChange={(e) => PWChange(e.target.value)}
            />
            <button
              type="button"
              className={styles.showPasswordButton}
              onClick={toggleShowNewPw}
            >
              {showNewPw ? "🙈" : "👁️"}
            </button>

            <input
              className={styles.mydata}
              type="password"
              placeholder="비밀번호확인"
              value={newPwcheck}
              onChange={(e) => PWCheckChange(e.target.value)}
            />

            <br />
            <button
              className={styles.mydatafix}
              type="submit"
              onClick={handlePasswordUpdate}
            >
              수정하기
            </button>
            <button className={styles.closebutton} onClick={handlepwclose}>
              닫기
            </button>
          </div>
        </div>
      )}

      {cgopen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalcg}>
            <h2>개열/학과 수정</h2>
            <div className={styles.formBox}>
              <h3>지금 현재 나의 계열 학과</h3>
              <div className={styles.currentCategory}>
                {userData.category.map((item, index) => (
                  <p key={index}>
                    학과: {item.majorName} / 전공: {item.categoryName}
                  </p>
                ))}
              </div>
            </div>

            <form className={styles.Deletelist}>
              <div className={styles.formBox}>
                <b>전공계열 및 학과 삭제</b>
                {userData.category.map((item, index) => (
                  <div className={styles.categoryItem} key={index}>
                    <label>
                      <input
                        type="checkbox"
                        className={styles.myCheckbox}
                        value={index}
                      />
                      {item.majorName} / {item.categoryName}
                    </label>
                  </div>
                ))}

                <br />
                <button className={styles.closebutton}>삭제하기</button>
              </div>
            </form>

            <form className={styles.addlist}>
              <div className={styles.formBox}>
                <b>전공계열 및 학과 추가</b>
                <label>학과 </label>
                <input className={styles.mydata1} type="text" />
                <br />
                <label>전공 </label>
                <input className={styles.mydata1} type="text" />
              </div>
            </form>
            <button className={styles.closebutton} onClick={handlemycgclose}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
