type BoardListItem = {
	boardId: number;
	title: string;
	createdAt: string;
	modifiedAt: string | null;
	userNickname: string;
	commentCnt: number;
	likeCnt: number;
	isAnonymous: number;
	isHide: number;
	isLike: boolean | null;
	imagesUrl: string[] | null;
};

export type { BoardListItem };
