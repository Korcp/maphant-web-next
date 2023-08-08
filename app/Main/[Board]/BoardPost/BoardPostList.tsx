"use client";
import React from "react";
import styles from "./BoardPostList.module.css";
import BoardPost from "./BoardPost";
import { useState, useEffect } from "react";

type PropsType = {
  SortType: string;
  boardType: number;
  boardPage: number;
};

type ArticleType = {
  boardId: number;
  commentCnt: number;
  createdAt: string;
  title: string;
  likeCnt: number;
  userNickname: string;
};

function BoardPostList({ SortType, boardType, boardPage }: PropsType) {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  let sort: number = 1;
  if (SortType === "최신순") sort = 1;
  if (SortType === "추천순") sort = 2;

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth", "maphant@pubKey");
    myHeaders.append("x-timestamp", "100");
    myHeaders.append("x-sign", "maphant@privKey");
    myHeaders.append("x-category", "1");

    fetch(
      `https://dev.api.tovelop.esm.kr/board?boardTypeId=${boardType}&page=${boardPage}&pageSize=10&sortCriterionId=${sort}`,
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

  }, [boardPage, sort]);

  return (
    <div className={styles.BoardPostList}>
      {articles.slice(0, 10).map((content) => (
        <BoardPost content={content} key={content.boardId} />
      ))}
    </div>
  );
}

export default BoardPostList;
