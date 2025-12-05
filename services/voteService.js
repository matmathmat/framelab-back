import { getDB } from "../database/database.js";

import BasicUser from '../models/userModel.js';
import Vote from '../models/voteModel.js';

export async function getVote(voteId) {
    try {
        const query = `
        SELECT
            votes.id, votes.creativity_note, votes.technic_note, votes.respect_note, votes.vote_date, votes.user_id,
            users.firstname, users.lastname
        FROM votes
        INNER JOIN
            users ON votes.user_id = users.id
        WHERE
            votes.id = ?
        `;

        const db = await getDB();
        const row = await db.get(query, [voteId]);

        if (row != undefined) {
            let basicUser = new BasicUser(row.user_id, row.firstname, row.lastname);
            return new Vote(row.id, row.creativity_note, row.technic_note, row.respect_note, row.vote_date, basicUser);
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getVotesByParticipationId(participationId) {
    try {
        const query = `
        SELECT
            votes.id, votes.creativity_note, votes.technic_note, votes.respect_note, votes.vote_date, votes.user_id,
            users.firstname, users.lastname
        FROM
            votes
        INNER
            JOIN users ON votes.user_id = users.id
        WHERE
            votes.participation_id = ?
        `;

        const db = await getDB();

        let votes = [];

        await db.each(query, [participationId], (err, row) => {
            let basicUser = new BasicUser(row.user_id, row.firstname, row.lastname);
            let vote = new Vote(row.id, row.creativity_note, row.technic_note, row.respect_note, row.vote_date, basicUser);
            votes.push(vote);
        });

        return votes;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function addVote(participationId, textContent, userId) {
    try {
        const db = await getDB();

        // On insère le commentaire
        const query = `
            INSERT INTO comments (text_content, user_id, participation_id)
            VALUES (?, ?, ?)
        `;

        const result = await db.run(query, [textContent, userId, participationId]);

        // On récupère l'id du commentaire
        const insertedId = result.lastID;

        // On récupère les informations du commentaire
        const newComment = await getComment(insertedId);

        return newComment;

    } catch (err) {
        console.error(err);
        return null;
    }
}