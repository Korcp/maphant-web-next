type PostType = {
  parentId?: number;
  typeId: number;
  title: string;
  body: string;
  isHide: number;
  isAnonymous: number;
  imagesUrl?: string[];
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
    imagesUrl?: string[];
    isLike: boolean;
    isMyBoard: boolean;
    tags: { id: number; name: string }[];
    userNickname: string;
    isBookmarked: boolean;
  };
  answerList: null;
};

type EditType = {
  id: number;
  title: string;
  body: string;
  isHide: number;
  imagesUrl?: string[];
  tags?: string[];
};
type uploadType = {
  file_size: number;
  upload_date: string;
  url: string;
  user_id: number;
}[];
export type { PostType, readPostType, EditType, uploadType };
