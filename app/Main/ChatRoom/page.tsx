"use client";

import React, { useState, useEffect } from "react";
import UserAPI from "@/lib/api/UserAPI";
import "./chatRoom.css";

export default function ChatRoom() {
  const [chatRooms, setChatRooms] = useState([]);
  const [mdoelop, setModelop] = useState(false);

  const clickchat = () => {
    console.log("바보");
  };

  useEffect(() => {
    UserAPI.getchat().then(async (res) => {
      setChatRooms(res.data);

      const chatRoomsWithProfiles = await Promise.all(
        res.data.map(async (chatRoom) => {
          const senderId = chatRoom.sender_id;
          try {
            const profileResponse = await UserAPI.userProfile(senderId);

            if (profileResponse.data) {
              return {
                ...chatRoom,
                userProfile: profileResponse.data,
              };
            } else {
              return chatRoom; // Return the chatRoom if profile data is missing
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
            return chatRoom; // Return the chatRoom in case of an error
          }
        })
      );

      setChatRooms(chatRoomsWithProfiles);
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
        <nav>
          <h3>채팅방 목록</h3>
          <hr />
        </nav>
        <div>
          <ul className="chatList">
            {chatRooms.map((chatRoom) => (
              <li key={chatRoom.id} className="chatItem" onClick={clickchat}>
                <div className="profile">
                  {/* 프로필 사진 */}
                  <img
                    src={
                      chatRoom.userProfile
                        ? chatRoom.userProfile.profileImg
                        : ""
                    }
                    alt={chatRoom.other_nickname}
                    className="profileImage"
                  />
                </div>
                <div className="chatContent">
                  <div className="infoBox">
                    {/* 이름 */}
                    <span className="name">{chatRoom.other_nickname}</span>
                    {/* 안읽은 메시지 개수 */}
                    <div className="unreadCount">
                      {chatRoom.unread_count > 0 && (
                        <span>{chatRoom.unread_count}</span>
                      )}
                    </div>
                  </div>
                  {/* 내용 */}
                  <p className="content">{chatRoom.last_content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
