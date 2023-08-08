"use client";
import React from "react";
import styles from "./BoardPostList.module.css";
import BoardPost from "./BoardPost";
import { useState, useEffect } from "react";

type PropsType = {
  SortType: String;
};

type ArticleType = {
  boardId: number;
  commentCnt: number;
  createdAt: string;
  title: string;
  likeCnt: number;
  userNickname: string;
};

function BoardPostList({ SortType }: PropsType) {
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    fetch("https://dev.api.tovelop.esm.kr/board/main?", {
      headers: {
        "content-type": "application/json",
        "x-auth": "maphant@pubKey",
        "x-timestamp": "100",
        "x-sign": "maphant@privKey",
      },
      method: "GET",
      body: JSON.stringify({
        boardType: "자유 게시판",
        sortCriterion: "likeCnt",
        page: 1,
        pageSize: 30,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        console.log(json);
        setArticles(json.data);
      });
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
