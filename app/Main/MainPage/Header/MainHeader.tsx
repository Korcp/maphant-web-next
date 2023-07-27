"use client";
import React, { useState, useRef } from "react";
import { MdSearch, MdDensityMedium } from "react-icons/md";

import iconpng from "../img/icon2.jpeg";
import DarkToggel from "./DarkToggle";
import UserMenu from "./UserMenu";
import BoardList from "./BoardList";

import Styles from "./MainHeader.module.css";
import Link from "next/link";
import Image from "next/image";

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
          <Link href="./Board" className={Styles.boardLink}>
            자유
          </Link>

          <Link href="./Board" className={Styles.boardLink}>
            지식
          </Link>

          <Link href="./Board" className={Styles.boardLink}>
            QnA
          </Link>

          <Link href="./Board" className={Styles.boardLink}>
            홍보
          </Link>

          <Link href="./Board" className={Styles.boardLink}>
            취업/진로
          </Link>

          <Link href="./Board" className={Styles.boardLink}>
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
        <Image src={iconpng} alt="" width={70} height={60} />
      </Link>
      <h3 className={Styles.major}>소프트웨어학과</h3>

      <div className={Styles.boardList}>
        <BoardList />
      </div>

      <div className={Styles.sizebutton}>
        <CreateMenu />
      </div>
      <form className={Styles.search} onSubmit={searchSubmit}>
        <button type="submit" className={Styles.searchIcon}>
          <MdSearch size={18} />
        </button>
        <input
          ref={searchInputRef}
          type="text"
          className={Styles.searchInput}
          placeholder="검색"
        />
      </form>

      <div>
        <DarkToggel />
      </div>
      <div className={Styles.userMenu}>
        <UserMenu />
      </div>

      <nav className={Styles.navbar}>
        <button className={Styles.navBtn} onClick={handleMenuButton}>
          <MdDensityMedium size={20} color="white" />
        </button>
      </nav>
    </header>
  );
}

export default MainHeader;
