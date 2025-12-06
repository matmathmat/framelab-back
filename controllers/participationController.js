import * as responseUtil from "../utils/responseUtil.js";

import Participation from "../models/participationModel.js";
import Challenge from "../models/challengeModel.js";

export async function getParticipation(request, response) {
    try {
        const participationId = request.params.id;
        const userId = request.userId;

        if (participationId == undefined || userId == undefined) {
            return responseUtil.setInvalidRequest(response);
        }

        const participation = await Participation.getById(participationId);

        if (!participation) {
            return responseUtil.setCustomNotFound(response, 'Participation introuvable');
        }

        return responseUtil.setOk(response, participation);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}

export async function getParticipations(request, response) {
    try {
        const challengeId = request.query.challengeId;
        const selectedPage = request.query.page;
        const userId = request.userId;

        console.log(challengeId, selectedPage, userId);

        if (challengeId == undefined || userId == undefined) {
            return responseUtil.setInvalidRequest(response);
        }

        const challenge = await Challenge.getById(challengeId);

        if (!challenge) {
            return responseUtil.setCustomNotFound(response, 'Challenge introuvable');
        }

        const participations = await challenge.getParticipations(challengeId, selectedPage);

        return responseUtil.setOk(response, participations);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}

export async function postParticipation(request, response) {
    try {
        if (!request.body) {
            return responseUtil.setInvalidRequest(response);
        }
        
        const challengeId = request.body.challengeId;
        const userId = request.userId;
        let photoUrl = request.file;

        if (challengeId == undefined || userId == undefined || photoUrl == undefined) {
            return responseUtil.setInvalidRequest(response);
        }

        // Suppression de public
        photoUrl = photoUrl.path.replace('public', '');

        // Normalisation du path
        photoUrl = photoUrl.replace(/\\/g, "/");

        const challenge = await Challenge.getById(challengeId);

        if (!challenge) {
            return responseUtil.setCustomNotFound(response, 'Challenge introuvable');
        }

        // Vérifier si le challenge est en cours
        const now = new Date();
        const startDate = new Date(challenge.startDate);
        const endDate = new Date(challenge.endDate);

        if (now < startDate) {
            return responseUtil.setCustomError(response, 400, "Le challenge n'a pas encore commencé");
        }

        if (now > endDate) {
            return responseUtil.setCustomError(response, 400, 'Le challenge est terminé');
        }

        // Vérifier si l'utilisateur a déjà participé
        const alreadyParticipated = await challenge.getParticipationByUserId(userId);

        if (alreadyParticipated != undefined) {
            return responseUtil.setCustomError(response, 409, 'Vous avez déjà soumis une participation pour ce challenge');
        }

        const participation = await challenge.addParticipation(photoUrl, userId);

        if (participation != null) {
            return responseUtil.setOk(response, participation);
        } else {
            return responseUtil.setInternalServer(response);
        }
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}