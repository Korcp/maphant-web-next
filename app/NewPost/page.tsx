"use client";
import React from "react";
import styles from "./newPost.module.css";
import MainHeader from "../MainPage/Header/MainHeader";

import Link from "next/link";

function NewPost() {
  return (
    <div className={styles.layout}>
      <MainHeader />

      <main className={styles.mainLayout}>
        <div className={styles.emptybox} />
        <div className={styles.flexbox1}>광고창</div>

        <div className={styles.NewPostLayout}>
          <div className={styles.boardName}>
            <p style={{ margin: 0 }} />
            <p style={{ fontSize: "1.5rem", margin: 0 }}>자유게시판</p>
            <p style={{ margin: 0 }}>자유롭게 글을 작성하세요</p>
          </div>

          <div className={styles.newTitle}>
            <p style={{ margin: "1%" }}>- 제목</p>
            <input
              className={styles.inputTitle}
              type="text"
              placeholder="제목을 입력해주세요."
            />
          </div>

          <div className={styles.newTag}>
            <p style={{ margin: "1%" }}>- 해시태그</p>
            <input
              className={styles.inputTag}
              type="text"
              placeholder="내용과 관련된 해시태그를 등록해 주세요."
            />
          </div>
          <div className={styles.newContent}>
            <p style={{ margin: "1%" }}>- 내용</p>
            <textarea className={styles.inputContent} name="" id=""></textarea>
          </div>
          <div className={styles.newPostMenu}>
            <Link href="/Board" >
              <button className={styles.cancelBtn}>취소</button>
            </Link>
            <Link href="/Board" >
              <button className={styles.postBtn}>등록</button>
            </Link>
          </div>
        </div>

        <div className={styles.flexbox2}>광고창</div>
        <div className={styles.emptybox} />
      </main>

      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}

export default NewPost;
