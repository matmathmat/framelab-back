import bcrypt from "bcrypt";

import { getDB } from "../database/database.js";

import BasicUser, { CompleteUser, CompleteUserToken } from '../models/userModel.js';

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

export async function getUserByEmail(email) {
    try {
        const query = `
        SELECT
            id, firstname, lastname, email, is_admin
        FROM users
        WHERE
            email = ?
        `;
        
        const db = await getDB();
        const user = await db.get(query, [email]);
        
        if (user != undefined) {
            return new CompleteUser(
                user.id, 
                user.firstname, 
                user.lastname, 
                user.is_admin, 
                user.email
            );
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getUserByEmailWithPassword(email, password) {
    try {
        const query = `
        SELECT
            id, firstname, lastname, email, password, is_admin
        FROM users
        WHERE
            email = ?
        `;
        
        const db = await getDB();
        const user = await db.get(query, [email]);
        
        if (user == undefined) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return null;
        }

        // Retourner l'utilisateur sans le password
        return new CompleteUserToken(user.id, user.firstname, user.lastname, user.is_admin, user.email);
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getUsers(orderBy, startWith, isAdmin) {
    try {
        let params = [];

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
                firstname LIKE ?
                OR lastname LIKE ?
            `;
            params.push(startWith + '%');
            params.push(startWith + '%');
        }

        if (!orderBy) {
            // Si order by est non défini on trie par id
            query += `
            ORDER BY
                id ASC
            `;
        } else {
            // On check si orderBy est valide sinon on lui affecte ASC
            orderBy = orderBy.toUpperCase();
            if (orderBy !== 'ASC' && orderBy !== 'DESC') {
                orderBy = 'ASC';
            }

            query += `
            ORDER BY
                lastname ${orderBy},
                firstname ${orderBy}
            `;
        }        

        // On ajoute une limitation
        query += `
        LIMIT 50
        `;

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

export async function addUser(email, password, firstname, lastname) {
    try {
        const db = await getDB();

        // Hash du mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // On insère l'utilisateur
        const query = `
        INSERT INTO
            users (email, password, firstname, lastname, is_admin)
        VALUES
            (?, ?, ?, ?, 0)
        `;

        const result = await db.run(query, [email, hashedPassword, firstname, lastname]);

        // On récupère l'id de l'utilisateur
        const insertedId = result.lastID;

        // On récupère les informations de l'utilisateur (avec email car c'est le créateur)
        const newUser = await getUser(insertedId, false, true);

        return newUser;

    } catch (err) {
        console.error(err);
        return null;
    }
}