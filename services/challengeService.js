import { getDB } from "../database/database.js";

import Challenge from "../models/challengeModel.js";
import BasicUser from "../models/userModel.js";

export async function getChallenge(challengeId) {
    try {
        const query = `
        SELECT
            challenges.id, challenges.title_theme, challenges.description_theme, challenges.photo_url, challenges.start_date, challenges.end_date, challenges.is_archived
        FROM
            challenges
        WHERE
            challenges.id = ?
        `;

        const db = await getDB();
        const row = await db.get(query, [challengeId]);

        if (row != undefined) {
            return new Challenge(
                row.id,
                row.title_theme,
                row.description_theme,
                row.photo_url,
                row.start_date,
                row.end_date,
                row.is_archived,
            );
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getActiveChallenge() {
    try {
        const now = new Date().toISOString();

        const query = `
        SELECT
            challenges.id, challenges.title_theme, challenges.description_theme, challenges.photo_url, challenges.start_date, challenges.end_date, challenges.is_archived
        FROM
            challenges
        WHERE
            challenges.start_date <= ?
            AND challenges.end_date >= ?
            AND challenges.is_archived = 0
        ORDER BY
            challenges.start_date DESC
        LIMIT 1
        `;
        const db = await getDB();
        const row = await db.get(query, [now, now]);
        
        if (row != undefined) {
            return new Challenge(
                row.id,
                row.title_theme,
                row.description_theme,
                row.photo_url,
                row.start_date,
                row.end_date,
                row.is_archived,
            );
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getChallenges(page = 1) {
    try {
        const offset = (page - 1) * 20;

        const query = `
        SELECT
            challenges.id, challenges.title_theme, challenges.description_theme, challenges.photo_url, challenges.start_date, challenges.end_date, challenges.is_archived
        FROM
            challenges
        LIMIT 20
        OFFSET ?
        `;

        const db = await getDB();

        let challenges = [];

        await db.each(query, [offset], (err, row) => {
            const challenge = new Challenge(
                row.id,
                row.title_theme,
                row.description_theme,
                row.photo_url,
                row.start_date,
                row.end_date,
                row.is_archived,
            );
            challenges.push(challenge);
        });

        return challenges;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function createChallenge(titleTheme, descriptionTheme, startDate, endDate, photoUrl) {
    try {
        const db = await getDB();

        // On insère le challenge
        const query = `
            INSERT INTO
                challenges (title_theme, description_theme, start_date, end_date, photo_url, is_archived)
            VALUES
                (?, ?, ?, ?, ?, 0)
        `;

        const result = await db.run(query, [titleTheme, descriptionTheme, startDate, endDate, photoUrl]);

        // On récupère l'id du challenge
        const insertedId = result.lastID;

        // On récupère les informations du challenge
        const newChallenge = await getComment(insertedId);

        return newChallenge;
    } catch (err) {
        console.error(err);
        return null;
    }
}