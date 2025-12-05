import * as commentService from "../services/commentService.js";

export default class Comment {
  constructor(id, textContent, commentDate, user, participationId) {
    this.id = id;
    this.textContent = textContent;
    this.commentDate = commentDate;
    this.participationId = participationId;
    this.user = user;
  }
}