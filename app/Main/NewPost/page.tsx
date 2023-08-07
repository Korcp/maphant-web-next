"use client";
import React from "react";
import styles from "./newPost.module.css";
import ImgList from "./ImgList";
import HashTagList from "./HashTagList";

import Link from "next/link";

function NewPost() {
  return (
    <div className={styles.NewPostLayout}>
      <div className={styles.boardName}>
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
        <HashTagList/>
      </div>

      <div className={styles.imgUpload}>
        <p style={{ margin: "1%" }}>- 사진 {'( 최대 5개 )'}</p>
        <ImgList/>
      </div>

      <div className={styles.newContent}>
        <p style={{ margin: "1%" }}>- 내용</p>
        <textarea className={styles.inputContent} maxLength={1450}></textarea>
      </div>
      <div className={styles.newPostMenu}>
        <Link href="./Board">
          <button className={styles.cancelBtn}>취소</button>
        </Link>
        <Link href="./Board">
          <button className={styles.postBtn}>등록</button>
        </Link>
      </div>
    </div>
  );
}

export default NewPost;
