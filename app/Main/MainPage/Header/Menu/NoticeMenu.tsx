"use client";
import React, { useState, useEffect } from "react";

import styles from "./NoticeMenu.module.css";
import UserAPI from "@/lib/api/UserAPI";
import UserStorage from "@/lib/storage/UserStorage";

function NotifiMenu() {
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    UserAPI.Getnofication().then((res) => {
      setAlert(res.data.list); // Assuming that the notifications are stored in the "list" property
    });
  }, []);

  return (
    <ul className={styles.noticeList}>
      <p className={styles.noticeTop}>알림</p>
      {alert.map((notification, index) => (
        <li className={styles.notice} key={index}>
          {notification.title}
          <br /> {notification.body}
        </li>
      ))}
    </ul>
  );
}

export default NotifiMenu;
