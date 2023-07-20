"use client";
import Image from "next/image";
import IconImg from "./img/Icon.png";
import "./SelectSch.css";
import Link from "next/link";
import { ReactElement } from "react";

export default function SelectSch(): ReactElement {
  const AdmissionYearDropdown = () => {
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
          </div>

          <div className="Major">
            <label>학과</label>
            <br />
            <input
              type="text"
              id="majorId"
              placeholder="학과를 입력해주세요."
            />
          </div>
          <div className="next">
            <Link href="/">
              <button type="submit" className="SelectBtn">
                완료
              </button>
            </Link>
          </div>
        </nav>
      </div>
    );
  };
  return <AdmissionYearDropdown />;
}
