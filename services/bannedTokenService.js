import { getDB } from "../database/database.js";

import BannedToken from '../models/bannedTokenModel.js';

export async function getBannedToken(token) {
    try {
        const query = `
        SELECT
            id, token
        FROM
            banned_tokens
        WHERE
            token = ?
        `;

        const db = await getDB();
        const row = await db.get(query, [token]);

        if (row != undefined) {
            return new BannedToken(row.id, row.token);
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getBannedTokenById(id) {
    try {
        const query = `
        SELECT
            id, token
        FROM
            banned_tokens
        WHERE
            id = ?
        `;

        const db = await getDB();
        const row = await db.get(query, [id]);

        if (row != undefined) {
            return new BannedToken(row.id, row.token);
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function addBannedToken(token) {
    try {
        const db = await getDB();

        // On insère le token banni
        const query = `
        INSERT INTO
            banned_tokens (token)
        VALUES
            (?)
        `;

        const result = await db.run(query, [token]);

        // On récupère l'id du token banni
        const insertedId = result.lastID;

        // On récupère les informations du token banni
        const newBannedToken = await getBannedTokenById(insertedId);

        return newBannedToken;
    } catch (err) {
        console.error(err);
        return null;
    }
}