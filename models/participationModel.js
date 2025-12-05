import { addComment } from "../services/commentService.js";

export default class Participation {
    constructor(id, photoUrl, submissionDate, isVisible, user) {
        this.id = id;
        this.photoUrl = photoUrl;
        this.submissionDate = submissionDate;
        this.isVisible = isVisible;
        this.user = user;
    }

    async addComment(textContent, userId) {
        return await addComment(this.id, textContent, userId);
    }
}