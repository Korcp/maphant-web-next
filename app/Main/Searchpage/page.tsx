'use client'
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Searchpage.module.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

function Searchpage() {
  const router = usePathname();
  const search = useSearchParams();
  const query = search.get("query");

  useEffect(() => {

  }, [router, query]);

  return (
    <div className={styles.boardLayout}>
      <div className={styles.molla}>
        {query ? `'${query}'` : "검색어"} 의 검색결과
      </div>

      <div className={styles.postMenu2}>
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

      <div className={styles.postList}>sgsg</div>

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

export default Searchpage;
