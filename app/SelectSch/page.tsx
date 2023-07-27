"use client";
import Image from "next/image";
import IconImg from "./img/Icon.png";
import "./SelectSch.css";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";

export default function SelectSch(): ReactElement {
  //전공계열,학과
  const [major, setmajor] = useState("");
  const [depart, setdepart] = useState("");

  //전공계열,학과받기
  const [mlist, setmlist] = useState([]);
  const [dlist, setdlist] = useState([]);
  //전공계열 새로고침
  const onmajor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const majorvalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setmajor(majorvalue);
  };

  const ondepart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const departvalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setdepart(departvalue);
  };

  //전공계열 받기
  useEffect(() => {
    fetch("https://dev.api.tovelop.esm.kr/user/categorylist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((res) => setmlist(res.data))
      .catch((error) => {
        console.error("오류 데이터 전송", error);
      });
  }, []);
  //학과 받기
  useEffect(() => {
    fetch("https://dev.api.tovelop.esm.kr/user/majorlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((res) => setdlist(res.data))
      .catch((error) => {
        console.error("오류 데이터 전송", error);
      });
  }, []);

  return (
    <div className="outer">
      <nav className="margin">
        <div className="imgbox">
          <Image src={IconImg} alt="" />
          <label>
            <b>학과 선택</b>
          </label>
        </div>

        <div className="Title">
          <label>전공계열</label>
          <br />
          <input
            type="Text"
            id="major"
            placeholder="전공계열을 선택하여주세요"
            list="majorlist"
            value={major}
            onChange={onmajor}
          />
          <datalist id="majorlist">
            {mlist.map((data, index) => (
              <option key={index} value={data} />
            ))}
          </datalist>
        </div>

        <div className="Major">
          <label>학과</label>
          <br />
          <input
            type="text"
            id="departId"
            placeholder="학과를 입력해주세요."
            list="departlist"
            value={depart}
            onChange={ondepart}
          />
          <datalist id="departlist">
            {dlist.map((data, index) => (
              <option key={index} value={data} />
            ))}
          </datalist>
        </div>
        <div className="next">
          <button type="submit" className="SelectBtn">
            완료
          </button>
        </div>
      </nav>
    </div>
  );
}
