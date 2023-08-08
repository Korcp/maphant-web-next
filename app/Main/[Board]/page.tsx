"use client";
import ErrorPage from "next/error";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdArrowBack, MdArrowForward,MdSearch, MdSort } from "react-icons/md";

import BoardPostList from "./BoardPost/BoardPostList";
import styles from "./Borad.module.css";

function Borad() {
  let boardName: string = "";
  let boardType: number = 0;
  const [boardPage, setBoardPage] = useState<number>(1);
  const [onSortMenu, setOnSortMenu] = useState<boolean>(false);
  const sortItems: string[] = ["최신순", "추천순"];
  const [sortNow, setSortNow] = useState<string>("최신순");

  if (usePathname() === "/Main/Free") {
    boardName = "자유게시판";
    boardType = 1;
  } else if (usePathname() === "/Main/Knowledge") {
    boardName = "지식게시판";
    boardType = 3;
  } else if (usePathname() === "/Main/QnA") {
    boardName = "QnA";
    boardType = 2;
  } else if (usePathname() === "/Main/Promotion") {
    boardName = "홍보게시판";
    boardType = 5;
  } else if (usePathname() === "/Main/Career") {
    boardName = "취업/진로";
    boardType = 4;
  } else if (usePathname() === "/Main/Hobby") {
    boardName = "취미";
    boardType = 6;
  } else {
    return <ErrorPage statusCode={404} />;
  }

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
              key={i}
            >
              {i}
            </button>
          );
        })}
      </ul>
    );
  };

  const pageDownEvent = () => {
    if (boardPage > 1) setBoardPage(boardPage - 1);
  };
  const pageUpEvent = () => {
    setBoardPage(boardPage + 1);
  };

  useEffect(() => {
    setBoardPage(1);
  }, [sortNow]);

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
          <p>{boardPage} / 992</p>
          <button className={styles.pageBtn} onClick={pageDownEvent}>
            <MdArrowBack />
          </button>
          <button className={styles.pageBtn} onClick={pageUpEvent}>
            <MdArrowForward />
          </button>
        </div>
      </div>

      <div className={styles.postList}>
        <BoardPostList
          SortType={sortNow}
          boardType={boardType}
          boardPage={boardPage}
        />
      </div>

      <div className={styles.postPage}>
        <div className={styles.pageBtn} onClick={pageDownEvent}>
          <MdArrowBack />
          Previous
        </div>
        <div>1 2 3 4 5 6 7 8 9... 999</div>
        <div className={styles.pageBtn} onClick={pageUpEvent}>
          Next
          <MdArrowForward />
        </div>
      </div>
    </div>
  );
}

export default Borad;
