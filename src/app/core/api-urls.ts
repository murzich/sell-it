import { environment } from '../../environments/environment';

export default class ApiUrls {
  static get adverts()  { return environment.apiBase + '/adverts'; }
  static get login()    { return environment.apiBase + '/login'; }
  static get register() { return environment.apiBase + '/registration'; }
}
