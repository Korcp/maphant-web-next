import React from "react";
import Styles from "./PostList.module.css";
import Post from "./Post";

function PostList() {
  return (
    <div className={Styles.postList}>
      <h4 className={Styles.boardName}>게시판 이름</h4>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  );
}

export default PostList;
