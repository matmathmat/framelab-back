import { addComment } from "../services/commentService.js";
import { addVote, getVoteByParticipationIdAndUserId } from "../services/voteService.js";

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

    async addVote(creativityNote, technicNote, respectNote, userId) {
        return await addVote(this.id, creativityNote, technicNote, respectNote, userId);
    }    

    async getVoteByParticipationIdAndUserId(userId) {
        return await getVoteByParticipationIdAndUserId(this.id, userId);
    }
}