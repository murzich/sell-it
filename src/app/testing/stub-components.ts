import { Component, Input } from '@angular/core';

@Component({selector: 'app-header', template: ''})
export class HeaderStubComponent { }

@Component({selector: 'app-footer', template: ''})
export class FooterStubComponent { }

@Component({selector: 'app-button-to-top', template: ''})
export class ButtonToTopStubComponent { }

@Component({selector: 'app-product-item', template: ''})
export class ProductItemStubComponent {
  @Input() id: number;
  @Input() image: string;
  @Input() name: string;
}

@Component({selector: 'app-login-form', template: ''})
export class LoginFormStubComponent {
}
