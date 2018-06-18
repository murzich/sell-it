import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../core/auth.service';
import { UserProfile } from '../../../core/models/user.model';
import { ProfileService } from '../../../core/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  user: UserProfile;
  subscription: Subscription;

  constructor(private profileService: ProfileService, private auth: AuthService, private router: Router) {
    this.subscription = this.profileService.profile$
      .subscribe(
        userProfile => this.user = userProfile
      );
  }

  logout() {
    this.auth.logout$.subscribe(
      () => this.router.navigate(['/login'])
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
