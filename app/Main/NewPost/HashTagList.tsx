import React, { useRef, useState } from "react";
import styles from "./HashTagList.module.css";
import { MdClose } from "react-icons/md";

const HashTagList = () => {
  const [hashTag, setHashTag] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const enterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitEvent();
    }
  };
  const duflicationCheck = (text: string): boolean => {
    var check = true;
    hashTag.map((item) => {
      if (item === text) {
        alert("이미 등록된 해시태그입니다.");
        check=false;
      }
    });
    return check;
  };

  const submitEvent = (): void => {
    if (inputRef.current?.value && duflicationCheck(inputRef.current.value)) {
      if (hashTag) setHashTag([...hashTag, inputRef.current.value]);
      else setHashTag([inputRef.current.value]);
      inputRef.current.value = "";
    }
  };

  const DelEvent = (text: string) => [
    setHashTag(
      hashTag.filter((item) => {
        return item !== text;
      })
    ),
  ];


  return (
    <div className={styles.hashTagList}>
      <input
        className={styles.inputTag}
        type="text"
        placeholder="# 내용과 관련된 해시태그를 등록해 주세요."
        ref={inputRef}
        onKeyUp={enterEvent}
      />
      {hashTag.length > 0 && (
        <div className={styles.hashTags}>
          {hashTag.map((item, i) => {
            return (
              <p className={styles.item} key={i}>
                # {item}
                <button
                  className={styles.delBtn}
                  onClick={() => DelEvent(item)}
                >
                  <MdClose size="1rem" />
                </button>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HashTagList;