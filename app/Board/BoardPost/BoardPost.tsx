"use client";
import React from "react";
import Styles from "./BoardPost.module.css";
import { MdOutlineComment } from "react-icons/md";

function BoardPost() {
  return (
    <div className={Styles.post}>
      <div className={Styles.postUser}>
        <div className={Styles.userLeft}>
          <p>엘링 홀란드</p>
          <p>3분전</p>
        </div>
        <div ><MdOutlineComment size='1rem'/> 58</div>
      </div>
      <p className={Styles.postContent}>발롱도르</p>
      <p className={Styles.postHash}>#해시태그</p>
    </div>
  );
}

export default BoardPost;
