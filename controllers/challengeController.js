import * as responseUtil from "../utils/responseUtil.js";

import Challenge from "../models/challengeModel.js";

export async function getChallenge(request, response) {
    try {
        const challengeId = request.params.id;

        if (challengeId == undefined) {
            return responseUtil.setInvalidRequest(response);
        }

        const challenge = await Challenge.getById(challengeId);

        if (!challenge) {
            return responseUtil.setCustomNotFound(response, 'Challenge introuvable');
        }

        return responseUtil.setOk(response, challenge);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}

export async function getCurrentChallenge(request, response) {
    try {
        const challenge = await Challenge.getActiveChallenge();

        if (!challenge) {
            return responseUtil.setCustomNotFound(response, "Aucun challenge actif pour le moment");
        }

        return responseUtil.setOk(response, challenge);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}

export async function getChallenges(request, response) {
    try {
        const selectedPage = request.query.page;

        if (selectedPage == undefined) {
            return responseUtil.setInvalidRequest(response);
        }         

        const challenges = await Challenge.getChallenges(selectedPage);

        return responseUtil.setOk(response, challenges);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}

export async function postChallenge(request, response) {
    try {
        if (!request.body) {
            return responseUtil.setInvalidRequest(response);
        }
        
        const titleTheme = request.body.titleTheme;
        const descriptionTheme = request.body.descriptionTheme;
        const startDate = request.body.startDate;
        const endDate = request.body.endDate;
        let photoUrl = request.file;

        if (
            titleTheme == undefined
            || descriptionTheme == undefined
            || startDate == undefined
            || endDate == undefined
            || isAdmin == undefined
            || photoUrl == undefined
        )
        {
            return responseUtil.setInvalidRequest(response);
        }      

        // Suppression de public
        photoUrl = photoUrl.path.replace('public', '');

        // Normalisation du path
        photoUrl = photoUrl.replace(/\\/g, "/");

        const challenge = await Challenge.createChallenge(
            titleTheme, 
            descriptionTheme, 
            startDate, 
            endDate, 
            photoUrl
        );

        if (challenge != null) {
            return responseUtil.setOk(response, challenge);
        } else {
            return responseUtil.setInternalServer(response);
        }
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}