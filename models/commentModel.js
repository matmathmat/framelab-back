import * as commentService from "../services/commentService.js";

export default class Comment {
  constructor(id, textContent, commentDate, user, participationId) {
    this.id = id;
    this.textContent = textContent;
    this.commentDate = commentDate;
    this.participationId = participationId;
    this.user = user;
  }

  static async getById(commentId) {
    const commentData = await commentService.getComment(commentId);
    
    if (!commentData) {
      return undefined;
    }

    return new Comment(
      commentData.id,
      commentData.textContent,
      commentData.commentDate,
      commentData.user,
      commentData.participationId
    );
  }
}