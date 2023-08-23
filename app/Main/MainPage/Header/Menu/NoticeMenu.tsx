"use client";
import React, { useState, useEffect } from "react";

import styles from "./NoticeMenu.module.css";
import UserAPI from "@/lib/api/UserAPI";
import UserStorage from "@/lib/storage/UserStorage";

function NotifiMenu() {
  const [alert, setalert] = useState("");
  /*useEffect(() => {
    UserAPI.noficationid().then((res) => {
      console.log("알림정보", res);
    });
  }, []);*/
  useEffect(() => {
    UserAPI.Getnofication().then((res) => {
      setalert(res.data),
        console.log("알림 리스트", res),
        console.log("알림창창창", alert);
    });
  }, []);

  return (
    <ul className={styles.noticeList}>
      <p className={styles.noticeTop}>알림</p>
      <li className={styles.notice}>~~~글에 댓글 달림</li>
      <li className={styles.notice}>댓글달림</li>
      <li className={styles.notice}>댓글달림</li>
      <li className={styles.notice}>댓글달림</li>
      <li className={styles.notice}>댓글달림</li>
      <li className={styles.notice}>댓글달림</li>
      <li className={styles.notice}>댓글달림</li>
    </ul>
  );
}

export default NotifiMenu;
