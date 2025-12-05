export function setMissingToken(response) {
    response.status(401);
    response.json({
        'succes': false,
        'message': 'Token manquant'
    });    
}

export function setExpiredToken(response) {
    response.status(401);
    response.json({
        'succes': false,
        'message': 'Token expiré'
    });    
}

export function setInvalidToken(response) {
    response.status(401);
    response.json({
        'succes': false,
        'message': 'Token invalide'
    });    
}

export function setUnauthorizedUser(response) {
    response.status(403);
    response.json({
        'succes': false,
        'message': 'Utilisateur non autorisé pour cette action'
    });    
}

export function setNotFound(response, colName) {
    response.status(404);
    response.json({
        'succes': false,
        'message': colName + ' introuvable'
    });    
}

export function setCustomNotFound(response, errorMessage) {
    response.status(404);
    response.json({
        'succes': false,
        'message': errorMessage
    });    
}

export function setInvalidRequest(response) {
    response.status(422);
    response.json({
        'succes': false,
        'message': 'Données de requête invalides'
    });    
}

export function setInternalServer(response) {
    response.status(500);
    response.json({
        'succes': false,
        'message': 'Erreur serveur'
    });    
}

export function setCustomError(response, errorCode, errorMessage) {
    response.status(errorCode);
    response.json({
        'succes': false,
        'message': errorMessage
    });    
}

export function setOk(response, data) {
    response.status(200);
    response.json({
        'succes': true,
        'result': data
    });    
}

export function setCreated(response, data) {
    response.status(201);
    response.json({
        'succes': true,
        'result': data
    });    
}

export function setAccepted(response, data) {
    response.status(202);
    response.json({
        'succes': true,
        'result': data
    });    
}