import { getDB } from "../database/database.js";

import BasicUser, { CompleteUser } from '../models/userModel.js';

export async function getUser(userId, isAdmin = false, isMe = false) {
    try {
        const query = `
        SELECT
            id, firstname, lastname, email, is_admin
        FROM users
        WHERE
            id = ?
        `;

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

export async function getUsers(orderBy = 'ASC', startWith, isAdmin) {
    try {
        let params = [];

        if (orderBy.toLowerCase() != 'asc' || orderBy.toLowerCase() != 'desc') {
            orderBy = 'asc'
        }

        let query = `
        SELECT
            id, firstname, lastname, email, is_admin
        FROM
            users
        `;
      
        // Si startWith est défini on ajoute une condition where
        if (startWith != undefined && startWith.trim() !== '') {
            query += `
            WHERE
                firstname LIKE ?% OR lastname LIKE ?%
            `;
            params.push(startWith);
            params.push(startWith);
        }        

        // Ajout de la limitation et order by
        query += `
        LIMIT 50
        ORDER BY
            lastname ?,
            firstname ?
        `; 
        params.push(orderBy);
        params.push(orderBy);

        const db = await getDB();
        let users = [];

        await db.each(query, params, (err, row) => {
            if (isAdmin) {
                let completeUser = new CompleteUser(row.id, row.firstname, row.lastname, row.is_admin, row.email);
                users.push(completeUser);
            } else {
                let basicUser = new BasicUser(row.id, row.firstname, row.lastname, row.is_admin);
                users.push(basicUser);
            }
        });

        return users;
    } catch (err) {
        console.error(err);
        return [];
    }
}