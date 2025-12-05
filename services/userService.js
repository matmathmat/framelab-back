import { getDB } from "../database/database.js";

import BasicUser from '../models/userModel.js';

export async function getUser(userId) {
  try {
      const query = `SELECT * FROM users WHERE id = ?`;

      const db = await getDB();
      const user = await db.get(query, [userId]);

      if (user != undefined) {
          return new BasicUser(user.id, user.firstname, user.lastname);
      } else {
          return null;
      }
  } catch (err) {
      console.error(err);
      return null;
  }
}