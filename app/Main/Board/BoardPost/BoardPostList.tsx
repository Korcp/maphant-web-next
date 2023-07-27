"use client";
import React from "react";
import styles from './BoardPostList.module.css';
import BoardPost from "./BoardPost";

function BoardPostList() {
  return (
    <div className={styles.BoardPostList}>
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
    </div>
  );
}

export default BoardPostList;
