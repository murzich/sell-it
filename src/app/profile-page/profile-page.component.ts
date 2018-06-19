import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { onErrorResumeNext } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

import { UserProfile } from '../core/models/user.model';
import { ProfileService } from '../core/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnDestroy {

  profileData: UserProfile;
  profileForm = new FormGroup({
    username: new FormControl('', Validators.pattern('/^\w$/i')),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    avatar: new FormControl(''),
    location: new FormControl(''),
    color_scheme: new FormControl(''),
    language: new FormControl('')
  });

  /**
   * Temporary variable for storing encoded user's avatar image
   */
  private imageBase64: string;
  private subscriptions: Subscription;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private auth: AuthService) {
    this.subscriptions = this.profileService.profile$
      .pipe(
        // TODO: add errors handling to display them in view;
        // keeps observable subscribed after HttpClient error
        onErrorResumeNext(
          this.profileService.profile$
        )
      )
      .subscribe(
        profile => {
          this.profileData = new UserProfile(profile);
          this.fillUpForm(profile);
        }
      );
  }

  /**
   * Encodes chosen file into base64
   * @param event target onClick
   * @return {void} assign encoded result to <tt>this.imageBase64</tt> in callback
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
    this.subscriptions.add(
      this.profileService.putProfile$(this.prepareProfile())
        .subscribe()
    );
  }

  onUpdate() {
    this.subscriptions.add(
      this.profileService.patchProfile$(this.prepareProfile())
        .subscribe()
    );
  }

  // TODO: refresh token button
  onTokenRefresh() {
    this.auth.tokenRefresh().subscribe({
      error: (err: HttpErrorResponse) => alert(Object.entries(err.error))
    });
  }

  /**
   * For resetting avatar image on backend is necessary to send an empty string
   */
  resetAvatar() {
    this.imageBase64 = '';
  }

  /**
   * Setters for quickly access to patch formControl in FormGroup
   * @param {string} name
   */
  private set username(name: string) {
    this.profileForm.get('username').patchValue(name);
  }
  private set first_name(name: string) {
    this.profileForm.get('first_name').patchValue(name);
  }
  private set last_name(name: string) {
    this.profileForm.get('last_name').patchValue(name);
  }
  private set avatar(name: string) {
    this.profileForm.get('avatar').patchValue(name);
  }
  private set language(name: string) {
    this.profileForm.get('language').patchValue(name);
  }
  private set color_scheme(name: string) {
    this.profileForm.get('color_scheme').patchValue(name);
  }
  private set location(location: string | object) {
    this.profileForm.get('location').patchValue((location) ? location['name'] : null);
  }

  /**
   * Patching formControl values from received profile object
   * @param profile UserProfile object
   */
  private fillUpForm(profile: UserProfile) {
    this.username = profile.username;
    this.first_name = profile.first_name;
    this.last_name = profile.last_name;
    // this.avatar = profile.avatar;
    this.language = profile.language;
    this.location = profile.location;
    this.color_scheme = profile.color_scheme;
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
