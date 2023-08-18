import { statusResponse, dataResponse, GetAPI, PostAPI } from "./fetchAPI";
import { CommentType } from "../type/CommentType";

class CommentAPI {
  static commentPost(boardId: number, body: string, is_anonymous: number) {
    return PostAPI<statusResponse>(`/comment/insert`, {
      board_id: boardId,
      body: body,
      is_anonymous: is_anonymous,
    });
  }

  static readComment(boardId: number, page: number, recordSize: number) {
    return GetAPI<dataResponse<CommentType>>(`/comment/list/${boardId}`, {
      page,
      recordSize,
    });
  }

  static likeComment(commentId: number) {
    return PostAPI<statusResponse>(`/comment/like`, { commentId });
  }
}

export default CommentAPI;
