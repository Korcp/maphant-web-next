"use client";

import React, { useEffect, useState } from "react";
import UserAPI from "@/lib/api/BoardAPI";
import { useSearchParams } from "next/navigation";
import "./MyChat.css";

export default function MyChat() {
  const [myChatData, setMyChatData] = useState<
    {
      board_id: number;
      board_title: string;
      board_type: string;
      boardtype_id: number;
      body: string;
      nickname: string;
      created_at: string;
      id: number;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordSize = 8;

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    loadMyChatData(currentPage);
  }, [currentPage]);

  const loadMyChatData = (page: number) => {
    UserAPI.MyChatLoad(page, recordSize)
      .then((response) => {
        console.log(response);
        setMyChatData(response.data.list);
      })
      .catch((error) => {
        console.error("채팅 데이터를 가져오는 중 오류 발생:", error);
      });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCommentClick = (comment: object) => {
    // 여기에서 댓글을 클릭한 후 해당 댓글의 위치로 이동하는 로직을 추가하세요.
    console.log("댓글 클릭:", comment);
  };
  return (
    <div className="MyChatCSS">
      <div className="Myheader">
        <header>
          <h1>내가 작성한 댓글</h1>
        </header>
      </div>
      <div className="MyChatnav">
        <nav>
          <label>과끼리에서 직접 작성한 댓글들의 기록을 보여줍니다.</label>
        </nav>
      </div>

      <div className="MySelect">
        <section>
          <hr />
          <ul>
            {myChatData.map((comment) => (
              <p key={comment.id} onClick={() => handleCommentClick(comment)}>
                <div className="comment-box">
                  <p className="comment-type">{comment.board_type}</p>
                  <p className="comment-title">제목: {comment.board_title}</p>
                  <p className="comment-date">작성일자: {comment.created_at}</p>
                  <p className="comment-body">내용: {comment.body}</p>
                </div>
              </p>
            ))}
          </ul>
          <div className="pagediv">
            <button
              className="pagebutton1"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전 페이지
            </button>
            <button
              className="pagebutton"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              다음 페이지
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
