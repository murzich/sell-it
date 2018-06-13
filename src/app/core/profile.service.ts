import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserProfileModel } from './models/user.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile = new BehaviorSubject(null);

  constructor(private sessionService: SessionService) {
    this.updateProfile();
  }

  get profile$(): Observable<UserProfileModel> {
    return this.profile.asObservable();
  }

  updateProfile(): void {
    this.profile.next(this.sessionService.userProfile);
  }
}
