export class User {
    id?: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
    location?: string;
    color_scheme?: string;
    language?: string;

    constructor(json: any) {
      this.id = json.id;
      this.username = json.username;
      this.email = json.email;
      this.first_name = json.first_name;
      this.last_name = json.last_name;
      this.avatar = !json.avatar ? 'assets/img/default.png' : json.avatar;
      this.location = json.location;
      this.color_scheme = json.color_scheme;
      this.language = json.language;
    }
}
