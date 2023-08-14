import { statusResponse } from "@/app/fetchAPI";
import { BoardListItem } from "../type/boardType";
import { PostType, readPostType } from "../type/postType";
import { dataResponse, GetAPI, PostAPI } from "./fetchAPI";

class BoardAPI {
	static listArticle(
		boardTypeId: number,
		page: number = 1,
		pageSize: number = 10,
		sortCriterionId: number
	) {
		return GetAPI<dataResponse<BoardListItem[]>>(`/board/`, {
			boardTypeId,
			page,
			pageSize,
			sortCriterionId,
		});
	}

	static newPostArticle(postData:PostType){
		return PostAPI<statusResponse>(`/board/create/`,
			postData
		)
	}

	static readPost(boardId:number){
		return GetAPI<dataResponse<readPostType>>(`/board/${boardId}/`
		)
	}

	static postLike(boardId:number){
		return PostAPI<statusResponse>(`/board/like/${boardId}/`)
	}
}

export default BoardAPI;
