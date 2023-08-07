"use client";
import React, { useState } from "react";
import Link from "next/link";

import styles from "./Borad.module.css";
import BoardPostList from "./BoardPost/BoardPostList";

import { MdSearch, MdSort, MdArrowBack, MdArrowForward } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { usePathname } from "next/navigation";

function Borad() {
  var boardName: string = "";
  if (usePathname() === "/Main/Free") boardName = "자유게시판";
  if (usePathname() === "/Main/Knowledge") boardName = "지식게시판";
  if (usePathname() === "/Main/QnA") boardName = "QnA";
  if (usePathname() === "/Main/Promotion") boardName = "홍보게시판";
  if (usePathname() === "/Main/Career") boardName = "취업/진로";
  if (usePathname() === "/Main/Hobby") boardName = "취미";

  const [onSortMenu, setOnSortMenu] = useState<boolean>(false);
  const sortItems: string[] = ["최신순", "추천순", "댓글순"];
  const [sortNow, setSortNow] = useState<string>("최신순");

  const SortItem = () => {
    return (
      <ul className={styles.sortItem}>
        {sortItems.map((i) => {
          return (
            <button
              className={styles.sortMenu}
              style={sortNow === i ? { color: "gray" } : {}}
              onClick={() => {
                setSortNow(i);
                setOnSortMenu(false);
              }}
            >
              {i}
            </button>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={styles.boardLayout}>
      <div className={styles.molla}>?</div>

      <div className={styles.boardName}>{boardName}</div>

      <div className={styles.postMenu1}>
        <Link href="./NewPost" style={{ textDecoration: "none" }}>
          <button className={styles.postBtn}>
            글쓰기
            <CiEdit size="1.375rem" />
          </button>
        </Link>
        <div className={styles.hashTags}>
          <p>#해시태그1</p>
          <p>#해시태그2</p>
          <p>#해시태그3</p>
          <p>#해시태그4</p>
        </div>
        <div className={styles.sortBox}>
          <button
            className={styles.sortBtn}
            onClick={() => setOnSortMenu(!onSortMenu)}
          >
            <MdSort size="1.375rem" />
            {sortNow}
          </button>
          {onSortMenu && <SortItem />}
        </div>
      </div>

      <div className={styles.postMenu2}>
        <span className={styles.search}>
          <button type="button" className={styles.searchIcon}>
            <MdSearch size="1.125rem" />
          </button>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="검색"
          />
        </span>

        <div className={styles.boardPage}>
          <p>1 / 992</p>
          <button className={styles.pageBtn}>
            <MdArrowBack />
          </button>
          <button className={styles.pageBtn}>
            <MdArrowForward />
          </button>
        </div>
      </div>

      <div className={styles.postList}>
        <BoardPostList SortType={sortNow}/>
      </div>

      <div className={styles.postPage}>
        <div>
          <MdArrowBack />
          Previous
        </div>
        <div>1 2 3 4 5 6 7 8 9... 999</div>
        <div>
          Next
          <MdArrowForward />
        </div>
      </div>
    </div>
  );
}

export default Borad;
