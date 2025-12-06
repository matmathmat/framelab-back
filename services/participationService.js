import { getDB } from "../database/database.js";

import BasicUser from '../models/userModel.js';
import Participation from "../models/participationModel.js";

export async function getParticipation(participationId) {
  try {
    const query = `
        SELECT
          participations.id, participations.photo_url, participations.submission_date, participations.is_visible, participations.user_id,
          users.firstname, users.lastname
        FROM participations
        INNER JOIN
          users ON participations.user_id = users.id
        WHERE participations.id = ?
        `;
    
    const db = await getDB();
    const row = await db.get(query, [participationId]);

    if (row != undefined) {
      let basicUser = new BasicUser(row.user_id, row.firstname, row.lastname);
      return new Participation(row.id, row.photo_url, row.submission_date, row.is_visible, basicUser);
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getParticipationsByChallengeId(challengeId, page = 1) {
    try {
        const offset = (page - 1) * 20;

        const query = `
        SELECT
          participations.id, participations.photo_url, participations.submission_date, participations.is_visible, participations.user_id,
          users.firstname, users.lastname
        FROM
            participations
        INNER JOIN
            users ON participations.user_id = users.id
        WHERE
            participations.challenge_id = ?
        LIMIT 20
        OFFSET ?
        `;

        const db = await getDB();

        let participations = [];

        await db.each(query, [challengeId, offset], (err, row) => {
            let basicUser = new BasicUser(row.user_id, row.firstname, row.lastname, row.is_admin);
            let participation = new Participation(row.id, row.photo_url, row.submission_date, row.is_visible, basicUser);
            participations.push(participation);
        });

        return participations;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function addParticipation(request, response) {
}