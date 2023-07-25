"use client";
import React from "react";
import Styles from "./BoardPost.module.css";
import { MdOutlineComment } from "react-icons/md";
import { FiThumbsUp } from "react-icons/fi";

function BoardPost() {
  return (
    <div className={Styles.post}>
      <div className={Styles.postUser}>
        <div className={Styles.userLeft}>
          <p>작성자</p>
          <p>3분전</p>
        </div>
        <div className={Styles.sss}>
          <FiThumbsUp />
          25
          <MdOutlineComment size="1rem" /> 58
        </div>
      </div>
      <p className={Styles.postContent}>제목 1234567890</p>
      <p className={Styles.postHash}>#해시태그</p>
    </div>
  );
}

export default BoardPost;
