"use client";
import sha512 from "crypto-js/sha512";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import useLocalStorage from "@/app/useLocalStorage";

import styles from "./MypagePW.module.css";
import UserAPI from "@/lib/api/UserAPI";
function page() {
	const router = useRouter();

	const [pw, setPw] = useState("");

	const onpw = (e: React.ChangeEvent<HTMLInputElement>) => {
		const passValue = e.target.value;
		setPw(passValue);
	};

	const { value: privKey } = useLocalStorage("privKey", "");
	const { value: token } = useLocalStorage("token", "");
	const timestamp = Math.floor(Date.now() / 1000);
	const sign = sha512(timestamp + privKey).toString();

	const pwcheck = () => {
		UserAPI.passwordConfirm(pw)
			.then(() => router.push("/Main/Mypage"))
			.catch((error) => alert(error));
	};
	return (
		<div className={styles.boardLayout}>
			<div className={styles.inforcheck}>본인확인</div>
			<div className={styles.tagpw}>계정 비밀번호</div>
			<input
				type="password"
				className={styles.pw}
				placeholder="계정 비밀번호"
				value={pw}
				onChange={onpw}
			></input>

			<button type="submit" className={styles.linktext} onClick={pwcheck}>
				확 인
			</button>
		</div>
	);
}

export default page;
