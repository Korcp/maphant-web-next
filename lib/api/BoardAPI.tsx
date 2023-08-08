import { BoardListItem } from "../type/boardType";
import { UserData } from "../type/userType";
import Constraints from "./constraints";
import { dataResponse, GetAPI, PostAPI, statusResponse } from "./fetchAPI";

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
}

export default BoardAPI;
