import Image from "next/image";
import Link from "next/link";
import classes from "./page.module.css";
import IconImg from "./img/Icon.png";
import AppImg from "./img/loginAppImg.png";

export default function Home() {
  return (
    <div className={classes.outer}>
      <div className={classes.appImg}>
        <Image src={AppImg} alt="" />
      </div>
      <div className={classes.LoginPage}>
        <h1>
          <Image src={IconImg} alt="" />
        </h1>
        <p>과끼리에 오신 것을 환영합니다!</p>
        <input
          type="text"
          name="ID"
          id=""
          className={classes.Input}
          placeholder="아이디"
        />
        <br />
        <input
          type="password"
          name="password"
          className={classes.Input}
          placeholder="비밀번호"
        />
        <br />
        <Link href="/MainPage">
          <button id="LoginBtn" className={classes.button}>
            로그인
          </button>
        </Link>
        <br />
        <p className={classes.foundPwd}>
          비밀번호를 잊어버렸나요?
          <Link href="/SearchAccount">비밀번호찾기</Link>
        </p>
        <br />
        <p className="new">
          아직 회원이 아니신가요? <Link href="/Agree">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
