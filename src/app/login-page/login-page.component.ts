import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  private keyObject: { key: string; };

  constructor(private router: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.router.queryParams.subscribe(
      (value: { key: string }) => this.keyObject = value
    );
    if (this.keyObject.key !== undefined) {
      this.auth.verifyEmail(this.keyObject).subscribe();
    }
  }
}
