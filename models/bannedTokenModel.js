import * as bannedTokenService from "../services/bannedTokenService.js";

export default class BannedToken {
    constructor(id, token) {
        this.id = id;
        this.token = token;
    }

    static async getByToken(token) {
        const tokenData = await bannedTokenService.getBannedToken(token);

        if (!tokenData) {
            return undefined;
        }

        return new BannedToken(tokenData.id, tokenData.token);
    }

    static async create(token) {
        return await bannedTokenService.addBannedToken(token);
    }
}