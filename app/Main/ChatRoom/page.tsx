"use client";

import React, { useState, useEffect } from "react";
import UserAPI from "@/lib/api/UserAPI";

export default function ChatRoom() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    // 채팅방 목록 가져와서 상태에 저장
    UserAPI.getchat().then((res) => {
      setChatRooms(res.data), console.log(chatRooms);
    });

    UserAPI.noneRead().then((res) => console.log("안읽은쪽지", res));
  }, []);

  return (
    <div className="chatRoom">
      <div>
        <header>
          <h1>내 쪽지</h1>
        </header>
        <hr />
        <div>
          <h2>채팅방 목록</h2>
          <ul>
            {chatRooms.map((chatRoom) => (
              <li key={chatRoom.id}>
                {chatRoom.other_nickname}
                {chatRoom.last_content}
                {chatRoom.unread_count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
