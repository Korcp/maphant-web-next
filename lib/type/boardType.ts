type BoardListItem = {
	boardId?: number;
	id?:number;
	title: string;
	createdAt: string;
	modifiedAt: string | null;
	userNickname?: string;
	commentCnt: number;
	likeCnt: number;
	isAnonymous: number;
	isHide: number;
	isLike: boolean | null;
	imagesUrl: string[] | null;
	userId?: number;
};

export type { BoardListItem };
