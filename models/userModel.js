import * as userService from "../services/userService.js";

export default class BasicUser {
  constructor(id, firstname, lastname) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  static async getById(userId) {
    const userData = await userService.getUser(userId);
    
    if (!userData) {
      return undefined;
    }

    return new BasicUser(
      userData.id,
      userData.firstname,
      userData.lastname
    );
  }
}