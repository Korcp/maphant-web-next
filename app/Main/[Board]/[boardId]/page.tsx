"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./BoardId.module.css";
import ErrorPage from "next/error";
import { useEffect, useState } from "react";
import BoardAPI from "@/lib/api/BoardAPI";
import CommentAPI from "@/lib/api/CommentAPI";
import { readPostType } from "@/lib/type/postType";
import { MdThumbUp } from "react-icons/md";
import { FiThumbsUp } from "react-icons/fi";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import Comment from "./Comment";
import CommentList from "./CommentList";
import { CommentType } from "@/lib/type/CommentType";
import { BoardInfo } from "@/lib/Function/boardFunction";
import Image from "next/image";

const page = () => {
  const router = useRouter();
  const boardURL = usePathname();
  const parts = boardURL.split("/");
  const boardId = parts[parts.length - 1];
  const [article, setArticle] = useState<readPostType>();
  const [commentList, setCommentList] = useState<CommentType>();

  const boardLink = parts[parts.length - 2];

  let boardName: string = BoardInfo.getBoardName(boardLink);
  let boardType: number = BoardInfo.getBoardId(boardLink);
  if (BoardInfo.URL_Check(boardLink)) return <ErrorPage statusCode={404} />;

  const getComment = () => {
    if (article) {
      CommentAPI.readComment(parseInt(boardId), article.board.commentCnt)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const getPost = () => {
    BoardAPI.readPost(parseInt(boardId))
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    getComment();
  }, [article]);

  console.log(article);

  const likeUpEvent = () => {
    BoardAPI.postLike(parseInt(boardId))
      .then(() => {
        alert("추천되었습니다.");
        BoardAPI.readPost(parseInt(boardId))
          .then((res) => {
            setArticle(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => alert(err));
  };

  const reportEvent = () => {
    if (window.confirm("정말 신고하시겠습니까?")) {
      BoardAPI.reportPost(parseInt(boardId))
        .then(() => {
          alert("신고되었습니다");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const DeleteEvent = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      BoardAPI.PostDelete(parseInt(boardId)).then(() => {
        alert("글을 삭제되었습니다");
        router.back();
      });
    }
  };

  const CollectonEvent = () => {
    router.push(`/Main/${boardLink}/${boardId}/Update`);
  };

  const starEvent = () => {
    BoardAPI.starPost(boardId)
      .then(() => {
        alert("스트랩하였습니다");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.layout}>
      <div>
        <div className={styles.boardss}>
          <div className={styles.boardernm}>
            {boardName}
            <button className={styles.starPost} onClick={starEvent}>
              <IoBookmarkOutline />
            </button>
          </div>
        </div>

        <div className={styles.postman}>
          <div className={styles.nickname}>
            {article && article.board.userId}
          </div>

          <div className={styles.timeset} style={{ fontSize: ".7rem" }}>
            {article && BoardInfo.GetDetailDate(article.board.createdAt)}
            {article && article.board.isMyBoard && (
              <div>
                <button className={styles.fix} onClick={CollectonEvent}>
                  수정
                </button>
                <button className={styles.delete} onClick={DeleteEvent}>
                  삭제
                </button>
              </div>
            )}
          </div>

          <div className={styles.content}> {article?.board.title}</div>

          {article?.board.body}

          <div className={styles.hashtag}>
            {article?.board.tags.map((item: any, index: number) => (
              <p key={index}>#{item.name}</p>
            ))}
          </div>

          <div className={styles.likeIcon}>
            {article?.board.isLike ? <MdThumbUp /> : <FiThumbsUp />}
            {article?.board.likeCnt}
          </div>
          <div className={styles.report}>
            <button className={styles.bTn1} onClick={reportEvent}>
              글 신고
            </button>
            <button className={styles.bTn2} onClick={likeUpEvent}>
              글 추천
            </button>

            <button className={styles.bTn5}>쪽지</button>
          </div>
        </div>

        {
          <div className={styles.messag}>
            <h3>댓글 {article && article?.board.commentCnt}</h3>
            <Comment boardId={parseInt(boardId)} getPost={getPost} />
            {article && commentList && (
              <CommentList
                commentList={commentList.list}
                isMyArticle={article.board.isMyBoard}
                commentCnt={article.board.commentCnt}
                getComment={getComment}
              />
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default page;
