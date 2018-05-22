export class User {
    _id?: string;
    name: string;
    email: string;

    constructor(_id: string, _name: string, _email: string) {
        this._id = _id;
        this.name = _name;
        this.email = _email;
    }
}

export interface User {
    _id?: string; // Assigned automatically by datastore
    name: string;
    email: string;
  }
