"use client";
import React, { useState, useRef } from "react";
import { MdSearch, MdDensityMedium } from "react-icons/md";
import { useRouter } from "next/navigation";
import iconpng from "../img/icon.png";
import DarkToggel from "./DarkToggle";
import UserMenu from "./UserMenu";
import BoardList from "./BoardList";

import Styles from "./MainHeader.module.css";
import Link from "next/link";
import Image from "next/image";

function MainHeader() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const searchSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchText = searchInputRef.current?.value;
    if (searchText) {
      router.replace(`/Main/Searchpage?query=${searchText}`);
    } else {
      alert("검색할 내용을 입력하세요");
    }
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
      <div className={Styles.icon}>
        <Link href="/Main/MainPage">
          <Image src={iconpng} alt="" fill />
        </Link>
      </div>
      <h3 className={Styles.major}>소프트웨어학과</h3>

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
        <DarkToggel />
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
