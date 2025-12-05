import * as responseUtil from "../utils/responseUtil.js";

import * as voteService from "../services/voteService.js";
import * as participationService from "../services/participationService.js";

export async function getVotes(request, response) {
    try {
        const participationId = request.query.participationId;
        const userId = request.userId;

        if (participationId == undefined || userId == undefined) {
            return responseUtil.setInvalidRequest(response);
        } 
        
        const participation = await participationService.getParticipation(participationId);

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
        
        const vote = await voteService.getVote(voteId);

        if (vote == null) {
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
        const textContent = request.body.textContent;
        const userId = request.userId;

        if (participationId == undefined || textContent == undefined || userId == undefined) {
            return responseUtil.setInvalidRequest(response);
        }

        const participation = await participationService.getParticipation(participationId);

        if (!participation) {
            return responseUtil.setCustomNotFound(response, 'Participation introuvable');
        }

        const comment = await participation.addComment(textContent, userId);

        if (comment != null) {
            return responseUtil.setOk(response, comment);
        } else {
            return responseUtil.setInternalServer(response);
        }
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);        
    }
}    