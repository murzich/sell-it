import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserProfileModel } from '../core/models/user.model';
import { ProfileService } from '../core/profile.service';
import ApiUrls from '../core/api-urls';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profileData: UserProfileModel;

  profileForm: FormGroup;

  imageBase64: string;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        data => this.profileData = data.profile
      );

    this.profileForm = new FormGroup({
      username: new FormControl(this.profileData.username, Validators.pattern('/^\w$/i')),
      first_name: new FormControl(this.profileData.first_name),
      last_name: new FormControl(this.profileData.last_name),
      avatar: new FormControl(''),
      location: new FormControl(this.profileData.location.name),
      color_scheme: new FormControl(this.profileData.color_scheme),
      language: new FormControl(this.profileData.language)
    });
  }

  onSubmit() {
    this.profileService.submitProfile(this.prepareProfile());
  }

  onFileChange(event) {
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    console.log('formData: ', formData.get('avatar'));
    event.target.addEventListener('loadend', () => {console.log('formData: ', formData.get('avatar'));})
    var request = new XMLHttpRequest();
    request.open("POST", ApiUrls.adverts);
    request.send(formData);
  }

  private prepareProfile(): UserProfileModel {
    const formModel = this.profileForm.value;
    formModel.location = {name: formModel.location};
    formModel.id = this.profileData.id;
    formModel.email = this.profileData.email;
    formModel.avatar = this.imageBase64;
    return formModel;
  }
}
