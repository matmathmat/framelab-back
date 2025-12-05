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
        
        const participationExists = await participationService.participationExists(participationId);

        if (!participationExists) {
            return responseUtil.setCustomNotFound(response, 'Participation introuvable');
        }        

        const comments = await commentService.getCommentsByParticipationId(participationId, selectedPage);

        return responseUtil.setOk(response, comments);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);  
    }
}

// export async function getcomment(request, response) {
//     try {
//         const commentID = request.param.id;
//         const userId = request.user_id;

//         if (commentID == undefined || userId == undefined) {
//             return responseUtil.setInvalidRequest(response);
//         } 
        
//         const comment = await commentModel.getCommentById(commentID);

//         if (comment == undefined) {
//              return responseUtil.setCustomNotFound(response, 'Commentaire introuvable');
//         }

//         // Création de l'objet final
//         let output = [];
//         comments.forEach(comment => {
//             output.push(serializeComment(comment));
//         });

//         return responseUtil.setOk(response, output);
//     } catch (err) {
//         console.error(err);
//         return responseUtil.setInternalServer(response);  
//     }
// }

// export async function postComment(request, response) {
//     try {
//         const participationId = request.body.participation_id;
//         const textContent = request.body.text_content;
//         const userId = request.user_id;

//         if (participationId == undefined || textContent == undefined || userId == undefined) {
//             return responseUtil.setInvalidRequest(response);
//         }

//         const participationExists = await participationModel.participationExists(participationId);

//         if (!participationExists) {
//             return responseUtil.setCustomNotFound(response, 'Participation introuvable');
//         }

//         const comment = await commentModel.addComment(participationId, textContent, userId);

//         if (comment != null) {
//             return responseUtil.setOk(response, comment);
//         } else {
//             return responseUtil.setInternalServer(response);
//         }
//     } catch (err) {
//         console.error(err);
//         return responseUtil.setInternalServer(response);        
//     }
// }    