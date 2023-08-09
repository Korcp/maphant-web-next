import { BoardListItem } from "../type/boardType";
import { dataResponse, GetAPI } from "./fetchAPI";


//https://dev.api.tovelop.esm.kr/board/search?content=Sample&boardTypeId=1


class BoardAPI {
	static listArticle(
        content: string,
        boardTypeId:number
	) {
		return GetAPI<dataResponse<BoardListItem[]>>(`/board/search`, {
            content,
            boardTypeId
		});
	}
}

export default BoardAPI;