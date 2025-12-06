import { signToken } from "../utils/tokenUtil.js";

import * as responseUtil from "../utils/responseUtil.js";

import { CompleteUser } from "../models/userModel.js";
import BannedToken from "../models/bannedTokenModel.js";

export async function login(request, response) {
    try {
        if (!request.body) {
            return responseUtil.setInvalidRequest(response);
        }

        const email = request.body.email;
        const password = request.body.password;

        if (email == undefined || password == undefined) {
            return responseUtil.setInvalidRequest(response);
        }

        const user = await CompleteUser.getByEmailWithPassword(email, password);

        if (!user) {
            return responseUtil.setCustomError(response, 401, 'Email ou mot de passe incorrect');
        }

        user.token = signToken({ userId: user.id });

        return responseUtil.setOk(response, user);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}

export async function logout(request, response) {
    try {
        // On cherche le token dans les cookies
        let token = request.cookies.token;

        if (token == undefined) {
            // Pas de cookie token ? on essaye de l'obtenir depuis l'authorisation
            const bearerToken = request.headers.authorization;

            if (bearerToken == undefined) {
                return responseUtil.setMissingToken(response);
            }

            // Si le token ne contient pas d'autorization ou qu'il est trop short
            if (!bearerToken.includes('Bearer') || bearerToken.length < 7) {
                return responseUtil.setMissingToken(response);
            }
            
            // on obtient le token, il faut enlever Bearer 
            token = bearerToken.split(' ')[1];        
        }

        // Ajouter le token à la liste des tokens bannis
        const bannedToken = await BannedToken.create(token);

        if (!bannedToken) {
            return responseUtil.setInternalServer(response);
        }

        return responseUtil.setOk(response,
            { 
                message: 'Déconnexion réussie'
            }
        );
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}