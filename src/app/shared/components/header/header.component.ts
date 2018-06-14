import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserProfileModel } from '../../../core/models/user.model';
import { ProfileService } from '../../../core/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: UserProfileModel;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.profile$
      .pipe(
        take(1)
      )
      .subscribe(
        userProfile => this.user = userProfile
      );
  }
}
