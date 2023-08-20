type PostType = {
  parentId?: number;
  typeId: number;
  title: string;
  body: string;
  isHide: number;
  isComplete: number;
  isAnonymous: number;
  imageUrl? : string[];
  tagNames?: string[];
};

type readPostType = {
  board: {
    id: number;
    parentId: null;
    categoryId: number;
    userId: number;
    typeId: number;
    title: string;
    body: string;
    state: number;
    isHide: number;
    isComplete: number;
    isAnonymous: number;
    createdAt: string;
    modifiedAt: string;
    commentCnt: number;
    likeCnt: number;
    reportCnt: number;
    imagesUrl: null;
    isLike: boolean;
    isMyBoard:boolean;
  };
  answerList: null;
};

export type { PostType, readPostType };
