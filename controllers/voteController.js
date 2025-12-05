import * as responseUtil from "../utils/responseUtil.js";
import * as voteService from "../services/voteService.js";

import Participation from "../models/participationModel.js";
import Vote from "../models/voteModel.js";

export async function getVotes(request, response) {
    try {
        const participationId = request.query.participationId;
        const userId = request.userId;

        if (participationId == undefined || userId == undefined) {
            return responseUtil.setInvalidRequest(response);
        } 
        
        const participation = await Participation.getById(participationId);

        if (!participation) {
            return responseUtil.setCustomNotFound(response, 'Participation introuvable');
        }
        
        const votes = await voteService.getVotesByParticipationId(participation.id);

        return responseUtil.setOk(response, votes);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);  
    }
}

export async function getVote(request, response) {
    try {
        const voteId = request.params.id;
        const userId = request.userId;

        if (voteId == undefined || userId == undefined) {
            return responseUtil.setInvalidRequest(response);
        } 
        
        const vote = await Vote.getById(voteId);

        if (!vote) {
             return responseUtil.setCustomNotFound(response, 'Vote introuvable');
        }

        return responseUtil.setOk(response, vote);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);  
    }
}

export async function postVote(request, response) {
    try {
        const participationId = request.body.participationId;
        const creativityNote = request.body.creativityNote;
        const technicNote = request.body.technicNote;
        const respectNote = request.body.respectNote;
        const userId = request.userId;

        if (participationId == undefined
            || creativityNote == undefined
            || technicNote == undefined
            || respectNote == undefined
        ) {
            return responseUtil.setInvalidRequest(response);
        }

        const participation = await Participation.getById(participationId);

        if (!participation) {
            return responseUtil.setCustomNotFound(response, 'Participation introuvable');
        }

        if (participation.user.id == userId) {
            return responseUtil.setCustomError(response, 403, 'Vous ne pouvez pas voté pour votre participation.');
        }

        const alreadyVoted = await participation.getVoteByParticipationIdAndUserId(userId);

        if (alreadyVoted != undefined) {
            return responseUtil.setCustomError(response, 409, 'Vous avez déjà voté pour cette participation');
        }

        const vote = await participation.addVote(creativityNote, technicNote, respectNote, userId);
        
        if (vote != null) {
            return responseUtil.setOk(response, vote);
        } else {
            return responseUtil.setInternalServer(response);
        }
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);        
    }
}