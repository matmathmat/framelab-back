import * as userService from "../services/userService.js";

export default class BasicUser {
  constructor(id, firstname, lastname, isAdmin) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.isAdmin = isAdmin;
  }

  static async getById(userId) {
    const userData = await userService.getUser(userId);
    
    if (!userData) {
      return undefined;
    }

    return new BasicUser(
      userData.id,
      userData.firstname,
      userData.lastname,
      userData.isAdmin
    );
  }
}

export class CompleteUser extends BasicUser {
  constructor(id, firstname, lastname, isAdmin, email) {
    super(id, firstname, lastname, isAdmin);
    this.email = email;
  }

  static async getById(userId) {
    const userData = await userService.getUser(userId);
    
    if (!userData) {
      return undefined;
    }

    return new CompleteUser(
      userData.id,
      userData.firstname,
      userData.lastname,
      userData.isAdmin,
      userData.email
    );
  }
}