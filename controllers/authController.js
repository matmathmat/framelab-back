import { verifyToken } from "../utils/tokenUtil.js";
import * as responseUtil from "../utils/responseUtil.js";
import { getUser } from "../services/userService.js";

export async function authentification(request, response, next) {
    // on cherche le token dans les cookies
    let token = request.cookies.token;

    if (token == undefined) {
        // Pas de cookie token ? on essaye de l'obtenir depuis l'authorisation
        const bearerToken = request.headers.authorization;

        // Si le token ne contient pas d'autorization ou qu'il est trop short
        if (!bearerToken.includes('Bearer') || bearerToken.length < 7) {
            return responseUtil.setMissingToken(response);
        }
        
        // on obtient le token, il faut enlever Bearer 
        token = bearerToken.split(' ')[1];        
    }

    // On vérifie la validité du token
    let tokenData;
    try {
        tokenData = verifyToken(token);
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return responseUtil.setExpiredToken(response);
        } else {
            return responseUtil.setInvalidToken(response);
        }
    }

    // Si il n'y a pas la clef user_id on considère que le token n'est pas valide
    if (!('userId' in tokenData)) {
        return responseUtil.setInvalidToken(response);   
    }

    const userId = tokenData['userId'];

    // On verifie que l'utilisateur existe
    const user = await getUser(userId);
    if (!user) {
        return responseUtil.setInvalidToken(response);
    }
    
    // Si on a passé toutes ces étapes ça signifie que l'utilisateur existe
    // on ajoute l'user id à la request
    request.userId = user.id;

    // fin du middlewar
    next();
}