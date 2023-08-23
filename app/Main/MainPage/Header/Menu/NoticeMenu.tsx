"use client";
import React, { useState, useEffect } from "react";

import styles from "./NoticeMenu.module.css";
import UserAPI from "@/lib/api/UserAPI";
import UserStorage from "@/lib/storage/UserStorage";

function NotifiMenu() {
  const [alert, setAlert] = useState([]);
  const [alertId, setAlertId] = useState(null);

  useEffect(() => {
    UserAPI.Getnofication().then((res) => {
      setAlert(res.data.list);
    });
  }, []);

  const handleNotificationClick = (notificationId) => {
    setAlertId(notificationId);
  };

  return (
    <ul className={styles.noticeList}>
      <p className={styles.noticeTop}>알림</p>
      {alert.map((notification, index) => (
        <li
          className={`${styles.notice} ${
            alertId === notification.id ? styles.selected : ""
          }`}
          key={index}
          onClick={() => handleNotificationClick(notification.id)}
        >
          {notification.title}
          <br /> 댓글: {notification.body}
        </li>
      ))}
    </ul>
  );
}

export default NotifiMenu;
