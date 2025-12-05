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

export async function getVoteByParticipationIdAndUserId(participationId, userId) {
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
            votes.participation_id = ? and users.id = ?
        `;

        const db = await getDB();
        const row = await db.get(query, [participationId, userId]);

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

export async function addVote(participationId, creativityNote, technicNote, respectNote, userId) {
    try {
        const db = await getDB();

        // On insère le vote
        const query = `
            INSERT INTO votes (creativity_note, technic_note, respect_note, user_id, participation_id)
            VALUES (?, ?, ?, ?, ?)
        `;

        const result = await db.run(query, [creativityNote, technicNote, respectNote, userId, participationId]);

        // On récupère l'id du vote
        const insertedId = result.lastID;

        // On récupère les informations du vote
        const newVote = await getVote(insertedId);

        return newVote;

    } catch (err) {
        console.error(err);
        return null;
    }
}