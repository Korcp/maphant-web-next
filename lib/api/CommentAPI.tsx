import {
  statusResponse,
  dataResponse,
  GetAPI,
  PostAPI,
  DeleteAPI,
} from "./fetchAPI";
import { CommentType } from "../type/CommentType";

class CommentAPI {
  static commentPost(boardId: number, body: string, is_anonymous: number) {
    return PostAPI<statusResponse>(`/comment/insert`, {
      board_id: boardId,
      body: body,
      is_anonymous: is_anonymous,
    });
  }

  static readComment(boardId: number, recordSize: number) {
    return GetAPI<dataResponse<CommentType>>(`/comment/list/${boardId}`, {
      recordSize,
    });
  }

  static likeComment(commentId: number) {
    return PostAPI<statusResponse>(`/comment/like`, { commentId });
  }

  static DeleteComment(commentId: number) {
    return DeleteAPI(`/comment/${commentId}`);
  }

  static editComment(commentId:number, body:string){
    return PostAPI<statusResponse>(`/comment/update`,{
      id:commentId,
      body:body
    })
  }
}

export default CommentAPI;
