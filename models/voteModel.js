import * as voteService from "../services/voteService.js";

export default class Vote {
  constructor(id, creativityNote, technicNote, respectNote, voteDate, user) {
    this.id = id;
    this.creativityNote = creativityNote;
    this.technicNote = technicNote;
    this.respectNote = respectNote;
    this.voteDate = voteDate;
    this.user = user;
  }

  static async getById(voteId) {
    const voteData = await voteService.getVote(voteId);
    
    if (!voteData) {
      return undefined;
    }

    return new Vote(
      voteData.id,
      voteData.creativityNote,
      voteData.technicNote,
      voteData.respectNote,
      voteData.voteDate,
      voteData.user
    );
  }
}