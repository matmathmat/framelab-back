import { getDB } from "../database/database.js";

export async function getParticipation(participationId) {
  try {
      const query = `
        SELECT * FROM participations WHERE id = ?
        `;

      const db = await getDB();
      const participation = await db.get(query, [participationId]);

      if (participation != undefined) {
          return true;
      } else {
          return false;
      }
  } catch (err) {
      console.error(err);
      return false;
  }
}