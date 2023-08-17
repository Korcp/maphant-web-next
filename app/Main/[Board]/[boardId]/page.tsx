"use client";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./BoardId.module.css";
import ErrorPage from "next/error";
import { useEffect, useState } from "react";
import BoardAPI from "@/lib/api/BoardAPI";
import { readPostType } from "@/lib/type/postType";
import CommentList from "./CommentList";

const page = () => {
  const boardURL = usePathname();
  const parts = boardURL.split("/");
  const boardId = parts[parts.length - 1];
  const [article, setArticle] = useState<readPostType>();

  const boardLink = parts[parts.length - 2];

  let boardName: string = "";
  let boardType: number = 0;

  const detailDate = (a: string) => {
    const milliSeconds = +new Date() - +new Date(a);
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };
  console.log(boardName);

  if (boardLink === "Free") {
    boardName = "자유게시판";
    boardType = 1;
  } else if (boardLink === "Knowledge") {
    boardName = "지식게시판";
    boardType = 3;
  } else if (boardLink === "QnA") {
    boardName = "QnA";
    boardType = 2;
  } else if (boardLink === "Promotion") {
    boardName = "홍보게시판";
    boardType = 5;
  } else if (boardLink === "Career") {
    boardName = "취업/진로";
    boardType = 4;
  } else if (boardLink === "Hobby") {
    boardName = "취미";
    boardType = 6;
  } else {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    console.log("api 실행");
    BoardAPI.readPost(parseInt(boardId))
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(article);

  const likeUpEvent = () => {
    BoardAPI.postLike(parseInt(boardId))
      .then(() => {
        alert("추천되었습니다.");
        BoardAPI.readPost(parseInt(boardId))
          .then((res) => {
            setArticle(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={styles.layout}>
      <div>
        <div className={styles.boardss}>{boardName}</div>

        <div className={styles.postman}>
          <div className={styles.nickname}>{article?.board.userId}</div>
          <p style={{ fontSize: ".7rem" }}>
            {article ? detailDate(article?.board.createdAt) : ""}
          </p>
          <div className={styles.content}> {boardId}</div>

          {boardId}

          <div>#해시태그</div>
          <p>좋아요{article?.board.likeCnt}</p>
          <div className={styles.report}>
            <button className={styles.bTn1}>글 신고</button>
            <button className={styles.bTn2} onClick={likeUpEvent}>
              글 추천
            </button>

            <button className={styles.bTn4}>글 채택</button>
            <button className={styles.bTn5}>쪽지</button>
          </div>
        </div>

        <div className={styles.messag}>
          <CommentList boardId={parseInt(boardId)} />
        </div>
      </div>
    </div>
  );
};

export default page;
