export default class Participation {
    constructor(id, photoUrl, submissionDate, isVisible, user, challenge) {
        this.id = id;
        this.photoUrl = photoUrl;
        this.submissionDate = submissionDate;
        this.isVisible = isVisible;
        this.user = user;
        this.challenge = challenge;
    }
}