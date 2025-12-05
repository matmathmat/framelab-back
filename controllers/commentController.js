import * as responseUtil from "../utils/responseUtil.js";

import * as commentService from "../services/commentService.js";
import * as participationService from "../services/participationService.js";

export async function getcomments(request, response) {
    try {
        const participationId = request.query.participationId;
        const selectedPage = request.query.page;
        const userId = request.userId;

        if (participationId == undefined || selectedPage == undefined || userId == undefined) {
            return responseUtil.setInvalidRequest(response);
        } 
        
        const participation = await participationService.getParticipation(participationId);

        if (!participation) {
            return responseUtil.setCustomNotFound(response, 'Participation introuvable');
        }        

        const comments = await commentService.getCommentsByParticipationId(participation.id, selectedPage);

        return responseUtil.setOk(response, comments);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);  
    }
}

export async function getcomment(request, response) {
    try {
        const commentId = request.params.id;
        const userId = request.userId;

        if (commentId == undefined || userId == undefined) {
            return responseUtil.setInvalidRequest(response);
        } 
        
        const comment = await commentService.getComment(commentId);

        if (comment == null) {
             return responseUtil.setCustomNotFound(response, 'Commentaire introuvable');
        }

        return responseUtil.setOk(response, comment);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);  
    }
}

export async function postComment(request, response) {
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