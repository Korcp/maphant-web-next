"use client";
import React, { useState, useEffect } from "react";
import UserAPI from "@/lib/api/UserAPI";
import styles from "./ChatRoom.module.css";

export default function ChatRoom() {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const clickChat = (chatRoom) => {
    setSelectedChat(chatRoom);
    UserAPI.chatlist(chatRoom.id, 0).then((res) => {
      if (res.success) {
        setChatMessages(res.data.list);
      }
    });
  };

  useEffect(() => {
    UserAPI.getchat().then(async (res) => {
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
              return chatRoom;
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
            return chatRoom;
          }
        })
      );

      setChatRooms(chatRoomsWithProfiles);
    });

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
  console.log("확인이욤", selectedChat);

  const isMyMessage = (message) => {
    return message.sender_id === selectedChat.receiver_id;
  };

  const isOtherMessage = (message) => {
    return message.sender_id === selectedChat.sender_id;
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
                    <div
                      key={message.id}
                      className={`${styles.chatMessage} ${
                        isMyMessage(message)
                          ? styles.myMessage
                          : styles.otherMessage
                      }`}
                    >
                      <div className={styles.messageContainer}>
                        <div className={styles.profile}>
                          <img
                            src={
                              isMyMessage(message)
                                ? selectedChat.userProfile.profileImg
                                : selectedChat.userProfile.profileImg
                            }
                            alt={
                              isMyMessage(message)
                                ? selectedChat.other_nickname
                                : selectedChat.other_nickname
                            }
                            className={styles.profileImage}
                          />
                        </div>
                      </div>
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
