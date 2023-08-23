"use client";

import UserAPI from "@/lib/api/BoardAPI";
import { useState, useEffect } from "react";
import "./Mybook.css";
import { Router, useRouter } from "next/navigation";

export default function BookMark() {
  const [mybook, setMyBook] = useState({ list: [] }); // 초기화

  useEffect(() => {
    UserAPI.Getbookmark().then((res) => {
      setMyBook(res.data), console.log(res);
    });
  }, []);
  const router = useRouter();
  console.log("마이북", mybook);

  const getBoardPath = (type: string) => {
    // 게시판 타입에 따라 URL 경로를 반환
    switch (type) {
      case "1":
        return "Free";
      case "2":
        return "Knowledge";
      case "4":
        return "Promotion";
      case "5":
        return "Career";
      case "6":
        return "Hobby";
      case "3":
        return "QnA";
      default:
        return "";
    }
  };
  const hanldecommitClick = (comment: any) => {
    const boardPath = getBoardPath(comment.type);
    if (boardPath) {
      router.replace(`/Main/${boardPath}/${comment.boardId}`);
    }
  };

  return (
    <div className="bookCSS">
      <div className="Myheader">
        <header>
          <h1>나의 북마크</h1>
        </header>
      </div>
      <div className="MyBooknav">
        <nav>
          <label>나의 북마크를 보여줍니다.</label>
        </nav>
      </div>

      <div className="Mybook">
        <section>
          <hr />
          <div className="grid-container">
            {mybook.list.map((item, index) => (
              <div
                key={item.id}
                className="grid-item"
                onClick={() => hanldecommitClick(item)} // 매개변수 전달
              >
                <div className="book-box">
                  <p className="book-title"> 📑{item.boardTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
