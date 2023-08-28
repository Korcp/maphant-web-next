"use client";
import React, { useState, useEffect } from "react";
import UserAPI from "@/lib/api/UserAPI";
import styles from "./ChatRoom.module.css";
import UserStorage from "@/lib/storage/UserStorage";

export default function ChatRoom() {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [userData, setUserData] = useState(UserStorage.getUserProfile()!!);

  console.log(userData);

  const clickChat = async (chatRoom) => {
    setSelectedChat(chatRoom);
    try {
      const res = await UserAPI.chatlist(chatRoom.id, 0);
      if (res.success) {
        setChatMessages(
          await Promise.all(
            res.data.list.map(async (message) => {
              const senderId = message.sender_id; // 이 부분을 확인하세요
              if (senderId !== undefined) {
                // 발신자 ID가 유효한 경우에만 실행
                try {
                  const profileResponse = await UserAPI.userProfile(senderId);
                  if (profileResponse.data) {
                    return {
                      ...message,
                      senderProfile: profileResponse.data,
                    };
                  } else {
                    return message;
                  }
                } catch (error) {
                  console.error("Error fetching sender's profile:", error);
                  return message;
                }
              } else {
                return message;
              }
            })
          )
        );
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };
  useEffect(() => {
    UserAPI.getchat().then(async (res) => {
      const chatRoomsWithProfiles = await Promise.all(
        res.data.map(async (chatRoom) => {
          const senderId = chatRoom.sender_id;
          const receiverId = chatRoom.receiver_id;

          // Check if senderId matches userData.id
          const userIdToUse = senderId === userData.id ? receiverId : senderId;

          try {
            const profileResponse = await UserAPI.userProfile(userIdToUse);

            if (profileResponse.data) {
              return {
                ...chatRoom,
                userProfile: profileResponse.data,
              };
            } else {
              return chatRoom;
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
            return chatRoom;
          }
        })
      );

      console.log("정보확인이요", chatRooms);

      setChatRooms(chatRoomsWithProfiles);
    });
    console.log("챗메세지의정보", chatMessages);

    UserAPI.noneRead().then((res) => console.log("안읽은쪽지", res));
  }, []);

  const clicksend = () => {
    UserAPI.postMessage(selectedChat.other_id, messageInput).then((res) => {
      console.log(res);
      UserAPI.chatlist(selectedChat.id, 0).then((res) => {
        if (res.success) {
          setChatMessages(res.data.list);
        }
      });
    });
  };

  return (
    <div className={styles.chatRoom}>
      <div>
        <header>
          <h1>내 쪽지</h1>
        </header>
        <hr />
        <nav>
          <h3>채팅방 목록</h3>
          <hr />
        </nav>
        <div className={styles.chatMain}>
          <div className={styles.chatList}>
            <ul>
              {chatRooms.map((chatRoom) => (
                <li
                  key={chatRoom.id}
                  className={styles.chatItem}
                  onClick={() => clickChat(chatRoom)}
                >
                  <div>
                    <img
                      src={
                        chatRoom.userProfile
                          ? chatRoom.userProfile.profileImg
                          : ""
                      }
                      alt={chatRoom.other_nickname}
                      className={styles.profileImage}
                    />
                  </div>
                  <div className={styles.chatContent}>
                    <div className={styles.infoBox}>
                      <span className={styles.name}>
                        {chatRoom.other_nickname}
                      </span>
                      <div className={styles.unreadCount}>
                        {chatRoom.unread_count > 0 && (
                          <span>{chatRoom.unread_count}</span>
                        )}
                      </div>
                    </div>
                    <p className={styles.content}>{chatRoom.last_content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.chatForm}>
            {selectedChat && (
              <div className={styles.selectedChat}>
                <h2>{selectedChat.other_nickname}</h2>
                <div className={styles.chatMessages}>
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`${styles.chatMessage}`}>
                      <p>{message.content}</p>
                      <span>{message.time}</span>
                      <hr />
                    </div>
                  ))}
                </div>
                <div className={styles.chatInput}>
                  <input
                    type="text"
                    placeholder="메시지 입력"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <button onClick={clicksend}>보내기</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
