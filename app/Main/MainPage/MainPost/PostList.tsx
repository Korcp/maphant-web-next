"use client";
import React, { useState, useEffect } from "react";
import Styles from "./PostList.module.css";
import Post from "./Post";

type BoardName = {
  boardName: string;
};

type ArticleType = {
  boardId: number;
  commentCnt: number;
  createdAt: string;
  title: string;
  likeCnt: number;
  userNickname: string;
};

function PostList({ boardName }: BoardName) {
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    fetch("https://dev.api.tovelop.esm.kr/board/main", {
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
        console.log(resp);
        return resp.json();
      })
      .then((json) => {
        console.log(json);
        setArticles(json.data);
      });
  }, []);

  articles.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  return (
    <div className={Styles.postList}>
      <h4 className={Styles.boardName}>{boardName}</h4>
      {articles.slice(0, 5).map((content) => (
        <Post content={content} key={content.boardId} />
      ))}
    </div>
  );
}

export default PostList;
