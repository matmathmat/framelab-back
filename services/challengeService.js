import { getDB } from "../database/database.js";

import Challenge from "../models/challengeModel.js";
import BasicUser from "../models/userModel.js";

export async function getChallenge(challengeId) {
    try {
        const query = `
        SELECT
            challenges.id, challenges.title_theme, challenges.description_theme, challenges.photo_url, challenges.start_date, challenges.end_date, challenges.is_archived, challenges.user_id,
            users.firstname, users.lastname, users.is_admin
        FROM challenges
        INNER JOIN
            users ON challenges.user_id = users.id
        WHERE challenges.id = ?
        `;

        const db = await getDB();
        const row = await db.get(query, [challengeId]);

        if (row != undefined) {
            let basicUser = new BasicUser(row.user_id, row.firstname, row.lastname, row.is_admin);
            return new Challenge(
                row.id,
                row.title_theme,
                row.description_theme,
                row.photo_url,
                row.start_date,
                row.end_date,
                row.is_archived,
                basicUser
            );
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}