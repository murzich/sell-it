import { environment } from '../../environments/environment';

/**
 * Repository of URI supported by API backend server
 */
export default class ApiUrls {
  static get adverts()     { return environment.apiBase + 'adverts/'; }
  static get login()       { return environment.apiBase + 'login/'; }
  static get profile()     { return environment.apiBase + 'profile/'; }
  static get register()    { return environment.apiBase + 'registration/'; }
  static get verifyEmail() { return environment.apiBase + 'verify-email/'; }
  static get googleAuth()  { return environment.apiBase + 'rest-auth/google/'; }
}
