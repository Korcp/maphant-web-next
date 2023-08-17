"use client";

import React, { useEffect, useState } from "react";
import UserAPI from "@/lib/api/BoardAPI";
import { useSearchParams } from "next/navigation";

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
              <li key={comment.id}>
                {comment.board_type}
                <br />
                제목 :{comment.board_title} / 작성일자 : {comment.created_at}
                <br />
                내용 :{comment.body}
                <br />
                <br />
              </li>
            ))}
          </ul>
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전 페이지
            </button>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              다음 페이지
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
