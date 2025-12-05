import { getDB } from "../database/database.js";

import BasicUser, { CompleteUser } from '../models/userModel.js';

export async function getUser(userId, isAdmin = false, isMe = false) {
    try {
        const query = `SELECT * FROM users WHERE id = ?`;

        const db = await getDB();
        const user = await db.get(query, [userId]);

        if (user != undefined) {
            if (isAdmin || isMe) {
                return new CompleteUser(user.id, user.firstname, user.lastname, user.is_admin, user.email);
            } else {
                return new BasicUser(user.id, user.firstname, user.lastname, user.is_admin);
            }
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}