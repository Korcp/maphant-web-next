"use client";
import React from "react";
import styles from "./BoardPostList.module.css";
import BoardPost from "./BoardPost";
import { useState, useEffect } from "react";

type PropsType = {
  SortType: String;
  boardType: number;
};

type ArticleType = {
  boardId: number;
  commentCnt: number;
  createdAt: string;
  title: string;
  likeCnt: number;
  userNickname: string;
};

function BoardPostList({ SortType, boardType }: PropsType) {
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth", "maphant@pubKey");
    myHeaders.append("x-timestamp", "100");
    myHeaders.append("x-sign", "maphant@privKey");
    myHeaders.append("x-category", "1");

    fetch(
      `https://dev.api.tovelop.esm.kr/board?boardTypeId=${boardType}&page=1&pageSize=5&sortCriterionId=1`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        setArticles(json.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  switch (SortType) {
    case "최신순":
      articles.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      break;
    case "추천순":
      articles.sort((a, b) => b.likeCnt - a.likeCnt);
      break;
    case "댓글순":
      articles.sort((a, b) => b.commentCnt - a.commentCnt);
      break;
  }

  return (
    <div className={styles.BoardPostList}>
      {articles.slice(0, 10).map((content) => (
        <BoardPost content={content} key={content.boardId} />
      ))}
    </div>
  );
}

export default BoardPostList;
