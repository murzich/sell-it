import { environment } from '../../environments/environment';

export default class ApiUrls {
  static get adverts()  { return environment.apiBase + 'adverts/'; }
  static get login()    { return environment.apiBase + 'login/'; }

  static get profile() {
    return environment.apiBase + 'profile/';
  }
  static get register() { return environment.apiBase + 'registration/'; }
  static get verifyEmail() { return environment.apiBase + 'verify-email/'; }
}
