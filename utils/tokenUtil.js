import jwt from 'jsonwebtoken';

const apikey = process.env.SECRET_KEY;

export function signToken(data) {
    return jwt.sign(data, apikey);
}

export function verifyToken(token) {
    return jwt.verify(token, apikey);
}

// Créer un token pour les test
// console.log(signToken({userId: 2}))