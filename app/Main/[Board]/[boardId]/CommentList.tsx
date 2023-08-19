import React, { useEffect, useState } from "react";
import { CommentDetailType } from "@/lib/type/CommentType";
import CommentDetail from "./CommentDetail";

type PropsType = {
  commentList: CommentDetailType[];
  isMyArticle: boolean;
  commentCnt: number;
  getComment: () => void;
};
const commentList = ({ commentList, isMyArticle, getComment }: PropsType) => {
  console.log(commentList);

  return (
    <div style={{ marginTop: "2rem" }}>
      {commentList &&
        commentList.map((content) => (
          <CommentDetail
            content={content}
            isMyArticle={isMyArticle}
            getComment={getComment}
            key={content.id}
          />
        ))}
    </div>
  );
};

export default commentList;
