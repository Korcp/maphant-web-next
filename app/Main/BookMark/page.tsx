"use client";

import UserAPI from "@/lib/api/BoardAPI";

export default function BookMark() {
  const getbook = () => {
    UserAPI.Getbookmark().then((res) => console.log("북마크정보", res));
  };

  return (
    <div className="bookCSS">
      <div className="Myheader">
        <header>
          <h1>나의 북마크</h1>
        </header>
      </div>
      <div className="MyBooknav">
        <nav>
          <label onClick={getbook}>나의 북마크를 보여줍니다.</label>
        </nav>
      </div>

      <div className="MyBooks"></div>
    </div>
  );
}
