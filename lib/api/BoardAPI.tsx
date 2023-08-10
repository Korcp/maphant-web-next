import { statusResponse } from "@/app/fetchAPI";
import { BoardListItem } from "../type/boardType";
import { PostType } from "../type/postType";
import { dataResponse, GetAPI, PostAPI } from "./fetchAPI";

class BoardAPI {
	static listArticle(
		boardTypeId: number,
		page: number = 1,
		pageSize: number = 10,
		sortCriterionId: number
	) {
		return GetAPI<dataResponse<BoardListItem[]>>(`/board`, {
			boardTypeId,
			page,
			pageSize,
			sortCriterionId,
		});
	}

	static newPostArticle(postData:PostType){
		return PostAPI<statusResponse>(`/board/create`,
			postData
		)
	}
}

export default BoardAPI;
