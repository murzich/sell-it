import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserProfileModel } from '../core/models/user.model';
import { ProfileService } from '../core/profile.service';

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
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64 = reader.result;
      };
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
    }
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
