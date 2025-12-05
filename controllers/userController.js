import * as responseUtil from "../utils/responseUtil.js";
import * as userService from "../services/userService.js";

export async function getUser(request, response) {
    try {
        const userId = request.params.id;
        const isAdmin = request.isAdmin;
        const isMe = request.userId == userId;

        if (userId == undefined) {
            return responseUtil.setInvalidRequest(response);
        }

        const user = await userService.getUser(userId, isAdmin, isMe);

        if (!user) {
            return responseUtil.setCustomNotFound(response, 'Utilisateur introuvable');
        }

        return responseUtil.setOk(response, user);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}

export async function getUsers(request, response) {
    try {
        const orderBy = request.query.orderBy;
        const startWith = request.query.startWith;
        const isAdmin = request.isAdmin;

        const users = await userService.getUsers(orderBy, startWith, isAdmin);

        return responseUtil.setOk(response, users);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}

export async function getMe(request, response) {
    try {
        const userId = request.userId;

        if (userId == undefined) {
            return responseUtil.setInvalidRequest(response);
        }

        const user = await userService.getUser(userId, false, true);

        if (!user) {
            return responseUtil.setCustomNotFound(response, 'Utilisateur introuvable');
        }

        return responseUtil.setOk(response, user);
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}

export async function postUser(request, response) {
    try {
        if (!request.body) {
            return responseUtil.setInvalidRequest(response);
        }
        
        const email = request.body.email;
        const password = request.body.password;
        const firstname = request.body.firstname;
        const lastname = request.body.lastname;
        
        if (email == undefined
            || password == undefined
            || firstname == undefined
            || lastname == undefined
        ) {
            return responseUtil.setInvalidRequest(response);
        }
        
        // Vérifier si l'email existe déjà
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return responseUtil.setCustomError(response, 400, 'Cet email est déjà utilisé');
        }
        
        const newUser = await userService.addUser(email, password, firstname, lastname);
        if (newUser != null) {
            return responseUtil.setOk(response, newUser);
        } else {
            return responseUtil.setInternalServer(response);
        }
    } catch (err) {
        console.error(err);
        return responseUtil.setInternalServer(response);
    }
}