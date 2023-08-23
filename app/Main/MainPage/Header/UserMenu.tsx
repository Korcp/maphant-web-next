import React, { useRef, useState, useEffect } from "react";
import { MdMailOutline, MdNotificationsNone } from "react-icons/md";

import DropdownMenu from "./Menu/DropdownMenu";
import MailMenu from "./Menu/MailMenu";
import NoticeMenu from "./Menu/NoticeMenu";
import styles from "./UserMenu.module.css";
import UserAPI from "@/lib/api/UserAPI";
import UserStorage from "@/lib/storage/UserStorage";

function UserMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [NoticeMenuOpen, setNoticeMenuOpen] = useState(false);
  const [MailMenuOpen, SetMailMenuOpen] = useState(false);

  const userBtnRef = useRef<HTMLButtonElement>(null);
  const noticeBtnRef = useRef<HTMLButtonElement>(null);
  const mailBtnRef = useRef<HTMLButtonElement>(null);

  const [userData, setUserData] = useState(UserStorage.getUserProfile()!!);
  const [imgurl, setimgurl] = useState("");
  const id = userData.id;

  useEffect(() => {
    UserAPI.GETUserProfile(id).then((res) => setimgurl(res.data.profileImg));
  }, []);
  console.log("사진주소는", imgurl);

  const MenuOpenFun = (tap: string) => {
    tap === "Mail" ? SetMailMenuOpen(!MailMenuOpen) : SetMailMenuOpen(false);
    tap === "Notice"
      ? setNoticeMenuOpen(!NoticeMenuOpen)
      : setNoticeMenuOpen(false);
    tap === "User" ? setUserMenuOpen(!userMenuOpen) : setUserMenuOpen(false);
  };

  // window.addEventListener("click", (e) => {
  //   if (
  //     e.target !== userBtnRef.current &&
  //     e.target !== mailBtnRef.current &&
  //     e.target !== noticeBtnRef.current
  //   ) {
  //     setUserMenuOpen(false);
  //     setNoticeMenuOpen(false);
  //     SetMailMenuOpen(false);
  //   }
  // });

  return (
    <div className={styles.userMenu}>
      <button
        ref={mailBtnRef}
        className={styles.MailBtn}
        onClickCapture={(e) => {
          MenuOpenFun("Mail");
        }}
      >
        <MdMailOutline size="1.5rem" className={styles.mailIcon} />
      </button>

      <button
        ref={noticeBtnRef}
        className={styles.NoticeBtn}
        onClick={() => MenuOpenFun("Notice")}
      >
        <MdNotificationsNone size="1.5rem" className={styles.noticeIcon} />
      </button>

      <button
        ref={userBtnRef}
        className={styles.userBtn}
        onClick={() => MenuOpenFun("User")}
      >
        <div
          className={styles.circleWrapper}
          style={{
            backgroundImage: imgurl ? `url(${imgurl})` : "none",
          }}
        ></div>
      </button>

      {userMenuOpen && <DropdownMenu />}
      {NoticeMenuOpen && <NoticeMenu />}
      {MailMenuOpen && <MailMenu />}
    </div>
  );
}

export default UserMenu;
