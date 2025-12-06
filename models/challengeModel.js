import * as challengeService from "../services/challengeService.js";
import { addParticipation, getParticipationsByChallengeId, getParticipationByChallengeIdAndUserId } from "../services/participationService.js";

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

    static async createChallenge(titleTheme, descriptionTheme, startDate, endDate, photoUrl) {
        return await challengeService.createChallenge(titleTheme, descriptionTheme, startDate, endDate, photoUrl);
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
            challengeData.isArchived,
        );
    }

    static async getActiveChallenge() {
        const challengeData = await challengeService.getActiveChallenge();

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
            challengeData.isArchived,
        );
    }

    static async getChallenges(page = 1) {
        const challenges = await challengeService.getChallenges(page);
        return challenges;
    }

    async getParticipations(page) {
        return await getParticipationsByChallengeId(this.id, page);
    }

    async getParticipationByUserId(userId) {
        return await getParticipationByChallengeIdAndUserId(this.id, userId);
    }

    async addParticipation(photoUrl, userId) {
        return await addParticipation(this.id, photoUrl, userId);
    }
}