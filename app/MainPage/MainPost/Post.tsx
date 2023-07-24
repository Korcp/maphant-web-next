"use client";

import React from "react";
import Styles from './Post.module.css';

function Post() {
  return (
    <div className={Styles.post}>
      <div className={Styles.postUser}>
        <div className={Styles.userLeft}>
          <p>윤진수 </p>
          <p>3분전</p>
        </div>
        <div>댓글수:1</div>
      </div>
      <p className={Styles.postContent}>제목</p>
    </div>
  );
}

export default Post;
