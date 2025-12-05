import { getDB } from "../database/database.js";

export async function userIdExists(userId) {
  try {
      const query = `
        SELECT * FROM users WHERE id = ?
        `;

      const db = await getDB();
      const participation = await db.get(query, [userId]);

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