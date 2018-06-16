import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserProfile } from '../core/models/user.model';
import { ProfileService } from '../core/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  profileData: UserProfile;
  profileForm: FormGroup;

  private imageBase64: string | undefined;

  constructor(private route: ActivatedRoute, private profileService: ProfileService) {
  }

  ngOnInit() {
    /**
     * Takes data from resolver
     * Without resolver form throws errors on Initializing
     */
    this.route.data
      .subscribe(
        data => this.profileData = data.profile
      );

    this.profileForm = new FormGroup({
      username: new FormControl(this.profileData.username, Validators.pattern('/^\w$/i')),
      first_name: new FormControl(this.profileData.first_name),
      last_name: new FormControl(this.profileData.last_name),
      avatar: new FormControl(''),
      location: new FormControl(
        (this.profileData.location) ? this.profileData.location['name'] : null
      ),
      color_scheme: new FormControl(this.profileData.color_scheme),
      language: new FormControl(this.profileData.language)
    });
  }

  /**
   * Encodes chosen file into base64
   * @param event target onClick
   * @return {void} assign encoded result to **this.imageBase64** in callback
   */
  onFileChange(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64 = reader.result;
      };
    } else {
      this.imageBase64 = undefined;
    }
  }

  onSubmit() {
    this.profileService.putProfile(this.prepareProfile());
  }

  onUpdate() {
    this.profileService.patchProfile(this.prepareProfile());
  }

  /**
   * Converts form data to API acceptable type
   * @return {UserProfile} converted profile object, which is ready for putting to API server
   */
  private prepareProfile(): UserProfile {
    return new UserProfile({
      ...this.profileData,
      ...this.profileForm.value,
      ...{avatar: this.imageBase64}
    });
  }
}
