import React, { useEffect, useState } from "react";
import CommentAPI from "@/lib/api/CommentAPI";
import { CommentType } from "@/lib/type/CommentType";
import CommentDetail from "./CommentDetail";

type PropsType = {
  boardId: number;
  isMyArticle: boolean;
  commentCnt: number;
};
const commentList = ({ boardId, isMyArticle, commentCnt }: PropsType) => {
  const [commentList, setCommentList] = useState<CommentType>();

  const getComment = () => {
    CommentAPI.readComment(boardId, 1, commentCnt)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((err) => console.log(err));
  };
  const likeEvent = (id: number) => {
    CommentAPI.likeComment(id)
      .then(() => getComment())
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getComment();
  }, []);

  return (
    <div>
      {commentList &&
        commentList.list.map((content) => (
          <CommentDetail
            content={content}
            isMyArticle={isMyArticle}
            likeEvent={likeEvent}
            key={content.id}
          />
        ))}
    </div>
  );
};

export default commentList;
