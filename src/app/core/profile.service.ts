import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserProfileModel } from './models/user.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile = new BehaviorSubject(this.sessionProfile);

  constructor(private sessionService: SessionService) {
  }

  get profile$(): Observable<UserProfileModel> {
    if (this.sessionService.userProfile === null && this.sessionService.token !== undefined) {
      return this.sessionService.getProfileFromApi$;
    }
    this.updateProfile();
    return this.profile.asObservable();
  }

  private get sessionProfile(): UserProfileModel {
    return this.sessionService.userProfile;
  }

  private set sessionProfile(profileData: UserProfileModel) {
    this.sessionService.userProfile = profileData;
  }

  updateProfile(): void {
    this.profile.next(this.sessionProfile);
  }
}
