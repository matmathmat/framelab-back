import * as responseUtil from "../utils/responseUtil.js";

export const requireAdmin = (request, response, next) => {
    if (!request.isAdmin) {
        return responseUtil.setUnauthorizedUser(response);
    }
    
    next();
};