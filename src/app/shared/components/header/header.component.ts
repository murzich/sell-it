import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../core/auth.service';
import { UserProfile } from '../../../core/models/user.model';
import { ProfileService } from '../../../core/profile.service';
import { SessionService } from '../../../core/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$: Observable<UserProfile>;
  authorized$: Observable<boolean>;

  constructor(
    private profileService: ProfileService,
    private auth: AuthService,
    private session: SessionService,
    ) {
    this.user$ = this.profileService.profile$;
    this.authorized$ = this.session.isLoggedIn$;
  }

  logout() {
    this.auth.logout$.subscribe();
  }
}
