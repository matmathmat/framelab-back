import * as challengeService from "../services/challengeService.js";
import { addParticipation, getParticipationByChallengeIdAndUserId } from "../services/participationService.js";

export default class Challenge {
    constructor(id, titleTheme, descriptionTheme, photoUrl, startDate, endDate, isArchived) {
        this.id = id;
        this.titleTheme = titleTheme;
        this.descriptionTheme = descriptionTheme;
        this.photoUrl = photoUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isArchived = isArchived;
    }

    static async getById(challengeId) {
        const challengeData = await challengeService.getChallenge(challengeId);
        
        if (!challengeData) {
            return undefined;
        }

        return new Challenge(
            challengeData.id,
            challengeData.titleTheme,
            challengeData.descriptionTheme,
            challengeData.photoUrl,
            challengeData.startDate,
            challengeData.endDate,
            challengeData.isArchived
        );
    }

    async addParticipation(photoUrl, userId) {
        return await addParticipation(this.id, photoUrl, userId);
    }
}