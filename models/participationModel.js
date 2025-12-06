import { getCommentsByParticipationId, addComment } from "../services/commentService.js";
import { getVotesByParticipationId, getVoteByParticipationIdAndUserId, addVote } from "../services/voteService.js";
import { getParticipation } from "../services/participationService.js";

export default class Participation {
    constructor(id, photoUrl, submissionDate, isVisible, user) {
        this.id = id;
        this.photoUrl = photoUrl;
        this.submissionDate = submissionDate;
        this.isVisible = isVisible;
        this.user = user;
    }

    static async getById(participationId) {
        const participationData = await getParticipation(participationId);

        if (!participationData) {
            return undefined;
        }

        return new Participation(
            participationData.id,
            participationData.photoUrl,
            participationData.submissionDate,
            participationData.isVisible,
            participationData.user
        );
    }

    async addComment(textContent, userId) {
        return await addComment(this.id, textContent, userId);
    }

    async addVote(creativityNote, technicNote, respectNote, userId) {
        return await addVote(this.id, creativityNote, technicNote, respectNote, userId);
    }

    async getComments(page) {
        return await getCommentsByParticipationId(this.id, page);
    }

    async getVotes() {
        return await getVotesByParticipationId(this.id);
    }    

    async getVoteByParticipationIdAndUserId(userId) {
        return await getVoteByParticipationIdAndUserId(this.id, userId);
    }
}