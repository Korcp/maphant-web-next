import React, { useState, useEffect } from "react";

import styles from "./NoticeMenu.module.css";
import UserAPI from "@/lib/api/UserAPI";
import UserStorage from "@/lib/storage/UserStorage";

function NotifiMenu() {
  const [alert, setAlert] = useState([]);
  const [alertId, setAlertId] = useState<number>(null);
  const [read, setRead] = useState(false);
  const [readItems, setReadItems] = useState([]);

  useEffect(() => {
    UserAPI.Getnofication().then((res) => {
      setAlert(res.data.list);
    });
  }, []);

  const handleNotificationClick = async (notificationId: number) => {
    setAlertId(notificationId);
    const res = await UserAPI.noficationid(notificationId);
    setRead(res.success);
    setReadItems((prevItems) => [...prevItems, notificationId]);
    console.log(res.success);
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
          {readItems.includes(notification.id) && (
            <span className={styles.readIndicator}>읽음</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default NotifiMenu;
