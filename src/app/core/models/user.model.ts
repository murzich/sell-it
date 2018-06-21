import { LoginFormModel, RegistrationFormModel } from '../../login-page/login.model';
import { LocationApi } from './location.model';

/**
 * This image inserted as avatar image when the User doesn't have one
 * @type {string}
 */
export const defaultUserAvatar = 'assets/img/default.png';

/**
 * ## Common type of User registered on backend
 * @prop {string} avatar - User's {@link avatar} image
 * @prop {string} email - User's email
 * @prop {string} [first_name] - User's first name (optional)
 * @prop {number} id - User's ID
 * @prop {string} [last_name] - User's last name (optional)
 * @prop {string} username - User's username
 * @see UserProfile
 */
export class User {
  /**
   * ## User picture avatar
   * for update - <tt>POST</tt> or <tt>PATCH</tt> jpg, jpeg, png or gif file in base64
   * on <tt>GET</tt> - returns url string
   */
  avatar: string | null;
  readonly email: string;
  first_name?: string;
  readonly id: number;
  last_name?: string;
  username: string;

  constructor(json: User) {
    this.avatar = json.avatar || defaultUserAvatar;
    this.email = json.email;
    this.first_name = json.first_name;
    this.id = json.id;
    this.last_name = json.last_name;
    this.username = json.username;
  }
}

/**
 * ## Type of current logged in User
 * Inherits properties from {@link User} class
 * {@link avatar}, {@link email}, {@link first_name}, {@link id}, {@link last_name}, {@link username}
 *
 * @prop {string} color_scheme - {@link color_scheme} of current user profile
 * @prop {string} language - {@link language} setting of current user profile
 * @prop {string|{name:string}} location - {@link location} setting of current user profile
 * @see User
 */
export class UserProfile extends User {
  /**
   * User color scheme
   * acceptable types:
   * <pre>
   * #RRGGBB
   * rgb (rrr, ggg, bbb)
   * rgba(rrr, ggg, bbb, opacity)
   * hsl (hue, saturation, lightness)
   * hsla(hue, saturation, lightness, alpha)</pre>
   * @see UserProfile
   */
  color_scheme?: string | null;
  language?: string | null;
  location?: { name: string } | null | string;

  constructor(json: UserProfile) {
    super(json);
    this.avatar = (json.avatar === null) ? this.avatar : json.avatar || undefined;
    /**
     * For resetting avatar image on backend is necessary to send an empty string
     */
    if (json.avatar === '') {
      this.avatar = '';
    }
    this.color_scheme = json.color_scheme || undefined;
    this.language = json.language;
    this.location = LocationApi.new(json.location);
  }
}

/**
 * Model for converting User's credentials received in login form to acceptable by API
 */
export class UserCredentialsLoginModel {
  email: string;
  password: string;

  constructor(formData: LoginFormModel) {
    this.email = formData.email;
    this.password = formData.passwordGroup.password;
  }
}

/**
 * Model for converting User's credentials received in registration form to acceptable by API
 */
export class UserCredentialsRegisterModel {
  email: string;
  password1: string;
  password2: string;
  username?: string;

  constructor(formData: RegistrationFormModel) {
    this.email = formData.email;
    this.password1 = formData.passwordGroup.password;
    this.password2 = formData.passwordGroup.passwordConfirm;
    this.username = formData.username;
  }
}
