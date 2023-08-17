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

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    UserAPI.MyChatLoad()
      .then((response) => {
        console.log(response);
        setMyChatData(response.data.list);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
  }, []);
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
        </section>
      </div>
    </div>
  );
}
