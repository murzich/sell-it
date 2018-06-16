import { UserProfile } from './user.model';

export interface ApiResponseErrors {
  [key: string]: string[];
}

export interface ApiLoginResponse {
  token: string;
  user: UserProfile;
}
