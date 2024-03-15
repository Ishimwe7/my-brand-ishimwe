export default class Profile {
    constructor() {
        this._picture = null;
    }
    getPicture() {
        return this._picture;
    }
    setPicture(picture) {
        this._picture = picture;
    }
}