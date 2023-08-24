"use client";
import React, { useEffect, useState } from "react";

import styles from "./MailMenu.module.css";
import UserAPI from "@/lib/api/UserAPI";

function MailMenu() {
  const [chats, setchats] = useState([]);

  useEffect(() => {
    UserAPI.getchat().then((res) => {
      setchats(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <ul className={styles.MailList}>
      <p className={styles.mailTop}>받은 쪽지</p>
      {chats.map((chats) => (
        <li key={chats.id}>
          <div>
            <p>
              유저:{chats.other_nickname}
              <br />
              쪽지내용:{chats.last_content}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MailMenu;
