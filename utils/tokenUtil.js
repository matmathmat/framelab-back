import jwt from 'jsonwebtoken';

const apikey = 'TMVEsWCCIK9Fopuf-Beauty-Bell-Nation-Replace-Increase-Spin-Limited-Step-Ate-XawqBYSD6srIUFCl';

export function signToken(data) {
    return jwt.sign(data, apikey);
}

export function verifyToken(token) {
    return jwt.verify(token, apikey);
}

// Créer un token pour les test
// console.log(signToken({userId: 2}))