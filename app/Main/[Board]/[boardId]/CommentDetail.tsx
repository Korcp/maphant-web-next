import React, { Dispatch, SetStateAction, useState } from "react";
import { CommentDetail } from "@/lib/type/CommentType";
import CommentAPI from "@/lib/api/CommentAPI";
import styles from "./CommentDetail.module.css";
import { FiThumbsUp, FiMoreHorizontal, FiX, FiHeart } from "react-icons/fi";

type PropsType = {
  content: CommentDetail;
  isMyArticle: boolean;
  likeEvent: (id: number) => void;
};
const CommentDetail = ({ content, isMyArticle, likeEvent }: PropsType) => {
  const [more, setMore] = useState<boolean>(false);
  const detailBody = content.body.split("\n");

  return (
    <div className={styles.comment}>
      <div className={styles.contents}>
        <div className={styles.info}>
          <div className={styles.left}>
            <h4 className={styles.userName}>{content.nickname}</h4>
            <p className={styles.date}>{content.time}</p>
          </div>
        </div>
        <p className={styles.detail}>
          {detailBody.map((item) => (
            <React.Fragment key={item}>
              {item}
              <br />
            </React.Fragment>
          ))}
        </p>
        <p>답글 쓰기</p>
      </div>
      <div className={styles.btnbox}>
        {isMyArticle && (
          <div className={styles.more}>
            &nbsp;
            <div
              className={`${styles.editbox} ${more ? styles.on : styles.off}`}
            >
              <button className={styles.btn}>수정</button>
              <button className={styles.btn}>삭제</button>
              <button className={styles.btn}>신고</button>
            </div>

            {!more ? (
              <FiMoreHorizontal
                className={styles.moreBtn}
                onClick={() => {
                  setMore(!more);
                }}
              />
            ) : (
              <FiX
                className={styles.moreBtn}
                onClick={() => {
                  setMore(!more);
                }}
              />
            )}
          </div>
        )}
        <p className={styles.like}>
          <FiHeart
            onClick={() => likeEvent(content.id)}
            className={styles.likeBtn}
          />
          {content.like_cnt}
        </p>
      </div>
    </div>
  );
};

export default CommentDetail;
