import React, { ReactElement } from "react";
import { MdSearch } from "react-icons/md";
import Image from "next/image";
import iconpng from "./img/icon2.jpeg";
import DarkToggel from "./DarkToggle";

import Styles from "./MainHeader.module.css";

export default function MainHeaderSample(): ReactElement {
  return (
    <header className={Styles.header}>
      <div className={Styles.icon}></div>
      <h3 className={Styles.major}>소프트웨어학과</h3>
      <nav>
        <ul className={Styles.boardList}>
          <li>
            <a className={Styles.boardLink} href="">
              자유
            </a>
          </li>
          <span className={Styles.bar}></span>
          <li>
            <a className={Styles.boardLink} href="">
              지식
            </a>
          </li>
          <li>
            <a className={Styles.boardLink} href="">
              QnA
            </a>
          </li>
          <span className={Styles.bar}></span>
          <li>
            <a className={Styles.boardLink} href="">
              홍보
            </a>
          </li>
          <li>
            <a className={Styles.boardLink} href="">
              취업/진로
            </a>
          </li>
          <span className={Styles.bar}></span>
          <li>
            <a className={Styles.boardLink} href="">
              취미
            </a>
          </li>
        </ul>
      </nav>

      <span className={Styles.search}>
        <button type="button" className={Styles.searchIcon}>
          <MdSearch size={18} />
        </button>
        <input type="text" className={Styles.searchInput} placeholder="검색" />
      </span>

      <div>
        <DarkToggel />
      </div>

      <button className={Styles.userBtn}>사용자</button>
    </header>
  );
}
