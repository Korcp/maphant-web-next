"use client";
import React, { useState, useEffect } from "react";
import Styles from "./PostList.module.css";
import Post from "./Post";
import useLocalStorage from "@/app/useLocalStorage";

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
  var boardType:number=0; 


  if(boardName === '자유') boardType=1;  
  if(boardName === 'QnA') boardType=2;  
  if(boardName === '지식') boardType=3;  
  if(boardName === '취업/진로') boardType=4;  
  if(boardName === '홍보') boardType=5;  
  if(boardName === '취미') boardType=6;  

 

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth", "maphant@pubKey");
    myHeaders.append("x-timestamp", "100");
    myHeaders.append("x-sign", "maphant@privKey");
    myHeaders.append("x-category", "1");

    fetch(
      `https://dev.api.tovelop.esm.kr/board?boardTypeId=${boardType}&page=1&pageSize=100&sortCriterionId=1`,
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

useEffect(()=>{},[])

  console.log(boardName+'--'+boardType+'--');
  console.log(articles);

  articles.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  return (
    <div className={Styles.postList}>
      <h4 className={Styles.boardName}>{boardName}</h4>
      {articles.slice(0, 5).map((content) => (
        <Post content={content} key={content.boardId}/>
      ))}
    </div>
  );
}

export default PostList;
