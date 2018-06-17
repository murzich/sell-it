import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private profileService: ProfileService) {
    this.subscription = this.profileService.profile$
      .subscribe(
        userProfile => this.user = userProfile
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
