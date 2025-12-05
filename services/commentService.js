import { getDB } from "../database/database.js";

import BasicUser from '../models/userModel.js';
import Comment from '../models/commentModel.js';

export async function getCommentsByParticipationId(participationId, page = 1) {
    try {
        const offset = (page - 1) * 20;

        const query = `
        SELECT comments.id, comments.text_content, comments.comment_date, comments.user_id, users.firstname, users.lastname
        FROM comments
        INNER JOIN users ON comments.user_id = users.id
        WHERE participation_id = ?
        LIMIT 20
        OFFSET ?
        `;

        const db = await getDB();

        let comments = [];

        await db.each(query, [participationId, offset], (err, row) => {
            let user = new BasicUser(row['id'], row['firstname'], row['lastname']);
            let comment = new Comment(row['id'], row['text_content'], row['comment_date'], user);
            comments.push(comment);
        });

        return comments;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// export async function getCommentById(commentId) {
//     try {
//         const query = `
//         SELECT comments.id, comments.text_content, comments.comment_date, comments.user_id, users.firstname, users.lastname
//         FROM comments
//         INNER JOIN users ON comments.user_id = users.id
//         WHERE comments.id = ?
//         `;

//         const db = await getDB();
//         const row = await db.get(query, [commentId]);

//         return row;
//     } catch (err) {
//         console.error(err);
//         return [];
//     }
// }

// export async function addComment(participationId, textContent, userId) {
//     try {
//         const db = await getDB();

//         // On insère le commentaire
//         const query = `
//       INSERT INTO comments (text_content, user_id, participation_id)
//       VALUES (?, ?, ?)
//     `;

//         const result = await db.run(query, [textContent, userId, participationId]);

//         // On récupère l'id du commentaire
//         const insertedId = result.lastID;

//         // On récupère les informations du commentaire
//         const comment = await db.get(
//             "SELECT * FROM comments WHERE id = ?",
//             [insertedId]
//         );

//         return comment;

//     } catch (err) {
//         console.error(err);
//         return null;
//     }
// }