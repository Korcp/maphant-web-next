"use client";
import IconImg from "./img/Icon.png";
import "./EmailCheck.css";
import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EmailCheck(): ReactElement {
  const [email, setEmail] = useState("");
  const [time, setTime] = useState(180);
  const [EmailCheck, setEmailCheck] = useState("");
  const [showTimer, setShowTimer] = useState(false); // Added state variable

  // 이메일 체크
  const [emailError, setEmailError] = useState(false);
  const [Click, setClick] = useState(false);
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+(ac\.kr)$/;
  const emailRegEx2 = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+(edu)$/;

  const onEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    const input = e.target as HTMLInputElement;
    setEmail(emailValue);
    if (!emailValue) {
      setEmailError(true);
      input.setCustomValidity("이메일을 입력하여주세요");
    } else if (!emailRegEx.test(emailValue) && !emailRegEx2.test(emailValue)) {
      setEmailError(true);
      input.setCustomValidity("유효한 이메일을 입력하여주세요");
    } else {
      setEmailError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  const ShowText = () => {
    if (!email || emailError) {
      setClick(false);
    } else if (emailError === false) {
      setClick(true);
      setShowTimer(true);
      setTime(180);
    }
  };

  // 타이머
  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  if (time == 0) {
    alert("인증 요청을 다시해주세요.");
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="outer">
      <nav className="margin">
        <div className="imgbox">
          <Image src={IconImg} alt="" />
          <label>
            <b>이메일 인증</b>
          </label>
        </div>
        <br />
        <div className="email">
          <label className="EmailFont">이메일</label>
          <br />
          <input
            className="submitdata"
            type="email"
            id="emailId"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={onEmail}
            required
          />
          <br />
          <button className="submitbtn" type="submit" onClick={ShowText}>
            인증 요청
          </button>
        </div>

        <div className="email">
          <label className="EmailFont">인증번호</label>
          {Click && (
            <>
              <label className="Check">
                <br />
                ＊이메일로 전송된 인증코드를 입력하여주세요.
              </label>
              {showTimer && (
                <span className="Timer"> ※{formatTime(time)}</span>
              )}{" "}
            </>
          )}
          <br />
          <input
            className="submitdata"
            type="email"
            id="emailId"
            placeholder="인증번호를 입력해주세요"
            value={EmailCheck}
            onChange={(e) => setEmailCheck(e.target.value)}
          />
          <br />
          <button className="submitbtn" type="submit">
            확인
          </button>
        </div>

        <div className="next">
          <Link href="/SelectSch">
            <button type="submit" className="EmailBtn">
              완료
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
