"use client";

import React from "react";
import Styles from './Post.module.css';
import { MdOutlineComment } from "react-icons/md";
import {FiThumbsUp} from "react-icons/fi";

function Post() {
  return (
    <div className={Styles.post}>
      <div className={Styles.postUser}>
        <div className={Styles.userLeft}>
          <p>윤진수 </p>
          <p>3분전</p>
        </div>
        <div className={Styles.postInfo}>
          <FiThumbsUp />
          25
          <MdOutlineComment size="1rem" /> 58
        </div>
      </div>
      <p className={Styles.postContent}>제목</p>
    </div>
  );
}

export default Post;
