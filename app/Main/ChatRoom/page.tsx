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
  const [getUser, setGetUser] = useState("");
  const [ongetUser, setOngetUser] = useState([]);

  useEffect(() => {
    if (getUser) {
      UserAPI.GetUser(getUser).then((res) => {
        console.log("유저찾기", res);
        setOngetUser(res.data);
        console.log("데이터란", ongetUser);
      });
    }
  }, [getUser]);

  const fetchMessages = async (chatId) => {
    try {
      const res = await UserAPI.chatlist(chatId, 0);
      if (res.success) {
        setChatMessages(
          await Promise.all(
            res.data.list.map(async (message) => {
              const senderId = message.sender_id;
              if (senderId !== undefined) {
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

      setChatRooms(chatRoomsWithProfiles);
    });

    UserAPI.noneRead().then((res) => console.log("안읽은쪽지", res));

    const pollingInterval = setInterval(() => {
      if (selectedChat) {
        fetchMessages(selectedChat.id);
      }
    }, 1000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [selectedChat]);

  const clickChat = (chatRoom) => {
    setSelectedChat(chatRoom);
    fetchMessages(chatRoom.id); // Fetch initial messages for the clicked chat
  };

  const clicksend = () => {
    UserAPI.postMessage(selectedChat.other_id, messageInput).then((res) => {
      console.log(res);
      fetchMessages(selectedChat.id);

      setChatRooms((prevChatRooms) => {
        return prevChatRooms.map((chatRoom) => {
          if (chatRoom.id === selectedChat.id) {
            return {
              ...chatRoom,
              last_content: messageInput,
            };
          }
          return chatRoom;
        });
      });

      setMessageInput("");
    });
  };
  const clickDelete = () => {
    if (selectedChat) {
      UserAPI.DeleteRoom(selectedChat.id).then((res) =>
        console.log("대화방이 삭제되었습니다")
      );
    }
  };

  return (
    <div className={styles.chatRoom}>
      <p>
        유저 검색 :
        <input
          className={styles.search}
          type="text"
          list="userList"
          placeholder="닉네임은 2글자이상입력해주세요"
          value={getUser}
          onChange={(e) => setGetUser(e.target.value)}
        />
        <datalist id="userList">
          {ongetUser.map((data, index) => (
            <option key={index} value={data.nickname} />
          ))}
        </datalist>
      </p>

      <div>
        <header className={styles.header}>
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
                <button
                  className={styles.DeleteRoom}
                  onClick={() => clickDelete(selectedChat.room_id)}
                >
                  대화방 삭제
                </button>
                <h2>{selectedChat.other_nickname} </h2>

                <div className={styles.chatMessages}>
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.chatMessage} ${
                        message.is_me
                          ? styles.sentMessage
                          : styles.receivedMessage
                      }`}
                    >
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
