export default class Vote {
  constructor(id, creativityNote, technicNote, respectNote, voteDate, user) {
    this.id = id;
    this.creativityNote = creativityNote;
    this.technicNote = technicNote;
    this.respectNote = respectNote;
    this.voteDate = voteDate;
    this.user = user;
  }
}