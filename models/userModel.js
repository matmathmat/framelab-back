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

  static async getByEmail(email) {
    const userData = await userService.getUserByEmail(email);

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

  static async getById(userId, isAdmin = false, isMe = false) {
    const userData = await userService.getUser(userId, isAdmin, isMe);

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

  static async getByEmail(email) {
    const userData = await userService.getUserByEmail(email);

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

  static async getByEmailWithPassword(email, password) {
    const userData = await userService.getUserByEmailWithPassword(email, password);

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

  static async getUsers(orderBy, startWith, isAdmin) {
    return await userService.getUsers(orderBy, startWith, isAdmin);
  }

  static async create(email, password, firstname, lastname) {
    return await userService.addUser(email, password, firstname, lastname);
  }
}

export class CompleteUserToken extends CompleteUser {
  constructor(id, firstname, lastname, isAdmin, email, token) {
    super(id, firstname, lastname, isAdmin, email);
    this.token = token;
  }
}