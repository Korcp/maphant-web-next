"use client";
import React, { ReactElement, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./MainApp.module.css";
import PostList from "./MainPost/PostList";
import BoardAPI from "@/lib/api/BoardAPI";
import { HotPost, readPostType } from "@/lib/type/postType";
import { GetAPI } from "@/app/fetchAPI";
import BoardList from "./Header/BoardList";
export default function MainApp(): ReactElement {
  const [article, setArticle] = useState<HotPost>();
  const boardURL = usePathname();
  const parts = boardURL.split("/");
  const boardId = parts[parts.length - 1];

  const gethotEvent = () => {
    BoardAPI.GethotPost()
      .then((res) => {
        console.info( res);
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    gethotEvent();
  }, []);

  console.log(article);
  return (
    <div className={styles.mainLayout}>
      <div className={styles.hot}>
        <div className={styles.hotPost}>
          <p>{article&&article.list[0].title}</p>
        </div>
      </div>

      <div className={styles.box1}>
        <PostList boardName="자유" />

        <PostList boardName="지식" />

        <PostList boardName="QnA" />
      </div>

      <div className={styles.box2}>
        <PostList boardName="홍보" />

        <PostList boardName="취업/진로" />

        <PostList boardName="취미" />
      </div>
    </div>
  );
}
