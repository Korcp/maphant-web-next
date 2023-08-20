import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { CommentDetailType } from "@/lib/type/CommentType";
import CommentAPI from "@/lib/api/CommentAPI";
import styles from "./CommentDetail.module.css";
import { FiThumbsUp, FiMoreHorizontal, FiX, FiHeart } from "react-icons/fi";

type PropsType = {
  content: CommentDetailType;
  isMyArticle: boolean;
  getComment: () => void;
};
const CommentDetail = ({ content, isMyArticle, getComment }: PropsType) => {
  const [more, setMore] = useState<boolean>(false);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const detailBody = content.body.split("\n");

  const resizeTextEvent = () => {
    textRef.current!.style.height = "auto";
    textRef.current!.style.height = textRef.current!.scrollHeight + "px";
  };

  const likeEvent = (id: number) => {
    CommentAPI.likeComment(id)
      .then(() => getComment())
      .catch((err) => console.log(err));
  };
  const delEvent = (id: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      CommentAPI.DeleteComment(id)
        .then(() => {
          alert("댓글이 삭제되었습니다.");
          getComment();
        })
        .catch((err) => console.log(err));
    }
  };
  const editEvent = () => {
    if (textRef.current?.value) {
      CommentAPI.editComment(content.id, textRef.current.value)
        .then(() => getComment())
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {onEdit ? (
        <div className={styles.commentInput}>
          <textarea
            ref={textRef}
            className={styles.textBox}
            defaultValue={content.body}
            onChange={resizeTextEvent}
            rows={1}
          />
          <div className={styles.editBtnBox}>
            <button
              onClick={() => {
                editEvent();
                setOnEdit(!onEdit);
              }}
              className={styles.commentBtn}
            >
              댓글 수정
            </button>
            <button
              onClick={() => setOnEdit(!onEdit)}
              className={styles.cancelBtn}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.comment}>
          <div className={styles.contents}>
            <div className={styles.info}>
              <div className={styles.left}>
                <h4 className={styles.userName}>{content.nickname}</h4>
                <p className={styles.date}>{content.time}</p>
              </div>
            </div>
            <p className={styles.detail}>
              {detailBody.map((item, i) => (
                <React.Fragment key={item+i}>
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
                  className={`${styles.editbox} ${
                    more ? styles.on : styles.off
                  }`}
                >
                  <button
                    className={styles.btn}
                    onClick={() => {
                      setMore(!more);
                      setOnEdit(!onEdit);
                    }}
                  >
                    수정
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => delEvent(content.id)}
                  >
                    삭제
                  </button>
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
      )}
    </>
  );
};

export default CommentDetail;
