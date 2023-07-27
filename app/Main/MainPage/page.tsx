"use client";
import React, { ReactElement } from "react";
import PostList from "./MainPost/PostList";
import styles from "./MainApp.module.css";

export default function MainApp(): ReactElement {
  return (
    <>
      <div className={styles.hot}>
        <div className={styles.hotPost}>
          <p>HOT 키워드</p>
          <p>#김치</p>
          <p>#찌개</p>
          <p>#제육</p>
          <p>#볶음</p>
        </div>
      </div>

      <div className={styles.box1}>
        <PostList />

        <PostList />

        <PostList />
      </div>

      <div className={styles.box2}>
        <PostList />

        <PostList />

        <PostList />
      </div>
    </>
  );
}
