"use client";
import "./Signup.css";
import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
export default function Signup(): ReactElement {
  //input에 입력되는 value값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Repassword, setRepassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [school, setschool] = useState("");
  const [sNo, setsNo] = useState("");
  //유효성검사
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [RepasswordError, setRepasswordError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [schoolError, setschoolError] = useState(false);
  const [sNoError, setsNoError] = useState(false);
  //주소 navigate
  const router = useRouter();
  //이메일 유효성검사
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

  //비밀번호 유호성검사
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()]/;
  const onpassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwvalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setPassword(pwvalue);
    if (!pwvalue) {
      setPasswordError(true);
      input.setCustomValidity("비밀번호를 입력하여 주세요");
    } else if (
      !uppercaseRegex.test(pwvalue) ||
      !lowercaseRegex.test(pwvalue) ||
      !numberRegex.test(pwvalue) ||
      !specialCharRegex.test(pwvalue)
    ) {
      setPasswordError(true);
      input.setCustomValidity(
        "비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
      );
    } else {
      setPasswordError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  //비밀번호 확인 유호성검사
  const onRepassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const repwvalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setRepassword(repwvalue);
    if (!repwvalue) {
      setRepasswordError(true);
      input.setCustomValidity("비밀번호 확인을 입력하여 주세요");
    } else if (password !== repwvalue) {
      setRepasswordError(true);
      input.setCustomValidity("위의 비밀번호와 동일하게 작성하여주세요");
    } else {
      setRepasswordError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  //닉네임 확인 유효성 검사
  const parttenRegex = /^[A-Za-z0-9가-힣]*$/;
  const onNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknamevalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setNickname(nicknamevalue);
    if (!nicknamevalue) {
      setNicknameError(true);
      input.setCustomValidity("닉네임을 입력하여주세요");
    } else if (
      !parttenRegex.test(nicknamevalue) ||
      nicknamevalue.length < 3 ||
      nicknamevalue.length > 20
    ) {
      setNicknameError(true);
      input.setCustomValidity(
        "닉네임은 [3~20자의 영문(대,소문자), 한글, 숫자]만 입력가능합니다."
      );
    } else {
      setNicknameError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  //학교 유효성 검사
  const onSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
    const schoolvalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setschool(schoolvalue);
    if (!schoolvalue) {
      setschoolError(true);
      input.setCustomValidity("학교를 입력하여주세요");
    } else {
      setschoolError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  //학번 유효성 검사

  const onsNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sNovalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setsNo(sNovalue);
    if (!sNovalue) {
      setsNoError(true);
      input.setCustomValidity("학번을 입력하여 주세요");
    } else if (!numberRegex.test(sNovalue)) {
      setsNoError(true);
      input.setCustomValidity("올바른 학번을 입력하여 주세요");
    } else {
      setsNoError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  //회원가입 버튼 조건
  const PassPage = () => {
    let nullplusError = false;

    if (!email || emailError) {
      setEmailError(true);
      nullplusError = true;
    }
    if (!password || passwordError) {
      setPasswordError(true);
      nullplusError = true;
    }

    if (!Repassword || RepasswordError) {
      setRepasswordError(true);
      nullplusError = true;
    }

    if (!nickname || nicknameError) {
      setNicknameError(true);
      nullplusError = true;
    }

    if (!school || schoolError) {
      setschoolError(true);
      nullplusError = true;
    }

    if (!sNo || sNoError) {
      setsNoError(true);
      nullplusError = true;
    }

    if (nullplusError) {
      alert("위의 빈칸을 입력해주시거나 조건에 맞게 입력하여주세요");
    } else {
      router.push("/EmailCheck");
    }
  };
  return (
    <div className="SignupMain">
      <p className="SignupTitle">회원가입</p>

      <div className="container">
        <div className="inputcontainer">
          <p className="label">이메일</p>
          <input
            id="email"
            className="inputField"
            type="text"
            placeholder="abc123@gwakkili.ac.kr"
            value={email}
            onChange={onEmail}
            required
          />
        </div>
      </div>

      <div className="container">
        <div className="inputcontainer">
          <p className="label">비밀번호</p>
          <input
            id="password"
            className="inputField"
            type="password"
            placeholder="[영문 대, 소문자 1개 이상 + 숫자 1개 이상 + 특수문자 1개 이상]"
            value={password}
            onChange={onpassword}
            required
          />
        </div>
      </div>
      <div className="container">
        <div className="inputcontainer">
          <p className="label">비밀번호 확인</p>
          <input
            id="passwordChk"
            className="inputField"
            type="password"
            placeholder="위의 비밀번호와 동일하게 작성하세요"
            value={Repassword}
            onChange={onRepassword}
            required
          />
        </div>
      </div>

      <div className="container">
        <div className="inputcontainer">
          <p className="label">닉네임</p>
          <input
            id="nickname"
            className="inputField"
            type="text"
            placeholder="[3~20자의 영문(대,소문자), 한글, 숫자]"
            value={nickname}
            onChange={onNickname}
            required
          />
        </div>
      </div>

      <div className="container">
        <div className="inputcontainer">
          <p className="label">학교</p>
          <input
            id="universityName"
            className="inputField"
            type="text"
            placeholder="학교를 입력해주세요"
            value={school}
            onChange={onSchool}
            required
          />
        </div>
      </div>
      <div className="container">
        <div className="inputcontainer">
          <p className="label">학번</p>
          <input
            id="sNo"
            className="inputField"
            type="text"
            placeholder="학번을 입력해주세요"
            value={sNo}
            onChange={onsNo}
            required
          />
        </div>
      </div>

      <div className="btndiv">
        <br />
        <button type="submit" className="Btn" onClick={PassPage}>
          회원가입
        </button>
      </div>
    </div>
  );
}
