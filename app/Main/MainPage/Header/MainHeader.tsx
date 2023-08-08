"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef,useState } from "react";
import { MdDensityMedium,MdSearch } from "react-icons/md";

import DarkToggle from "@/app/DarkMode/DarkToggle";

import BoardList from "./BoardList";
import logo_kr from "./img/logo_kr.jpg";
import Styles from "./MainHeader.module.css";
import UserMenu from "./UserMenu";

function MainHeader() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchSubmit = () => {
    searchInputRef.current?.value
      ? alert(searchInputRef.current.value)
      : alert("검색할 내용을 입력하세요");
  };

  const [visiable, setVisiable] = useState<boolean>(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const backdropClick = (e: any) => {
    if (e !== linkRef) setVisiable(false);
  };

  function CreateMenu(): any {
    if (visiable) {
      return (
        <ul
          className={Styles.menuList}
          onClick={(e) => {
            backdropClick(e);
          }}
        >
          <Link href="/Main/Free" className={Styles.boardLink}>
            자유
          </Link>

          <Link href="/Main/Knowledge" className={Styles.boardLink}>
            지식
          </Link>

          <Link href="/Main/QnA" className={Styles.boardLink}>
            QnA
          </Link>

          <Link href="/Main/Promotion" className={Styles.boardLink}>
            홍보
          </Link>

          <Link href="/Main/Career" className={Styles.boardLink}>
            취업/진로
          </Link>

          <Link href="/Main/Hobby" className={Styles.boardLink}>
            취미
          </Link>
        </ul>
      );
    }
  }
  function handleMenuButton(): void {
    setVisiable(!visiable);
  }

  return (
      <header className={Styles.header}>
      <Link href="/Main/MainPage" className={Styles.icon}>
        <Image src={logo_kr} alt="" width={70} height={60} />
      </Link>
      <Link href="/Main/MainPage" className={Styles.major}>
      <h3 >소프트웨어학과</h3>
      </Link>

      <div className={Styles.boardList}>
        <BoardList />
      </div>

      <div className={Styles.sizebutton}>
        <CreateMenu />
      </div>

      <form className={Styles.search} onSubmit={searchSubmit}>
        <button type="submit" className={Styles.searchIcon}>
          <MdSearch size={"1.125rem"} />
        </button>
        <input
          ref={searchInputRef}
          type="text"
          className={Styles.searchInput}
          placeholder="검색"
        />
      </form>

      <div>
        <DarkToggle />
        {/* 다크모드 토글 버튼 작업 */}
      </div>
      <div className={Styles.userMenu}>
        <UserMenu />
      </div>

      <nav className={Styles.navbar}>
        <button className={Styles.navBtn} onClick={handleMenuButton}>
          <MdDensityMedium size={"1.25rem"} color="white" />
        </button>
      </nav>
    </header>
  );
}

export default MainHeader;
