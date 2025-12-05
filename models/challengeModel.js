export default class Challenge {
    constructor(id, titleTheme, descriptionTheme, PhotorUrl, startDate, endDate, isArchived) {
        this.id = id;
        this.titleTheme = titleTheme;
        this.descriptionTheme = descriptionTheme;
        this.PhotorUrl = PhotorUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isArchived = isArchived;
    }
}