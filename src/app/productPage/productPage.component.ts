import { Component, OnInit } from '@angular/core';

import { AdvertService } from '../advert.service';
import { Advert } from '../advert.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './productPage.component.html',
  styleUrls: ['./productPage.component.scss'],
  providers: []
})
export class ProductPageComponent implements OnInit {
  public adverts: Advert[];
  constructor(private advertService: AdvertService) { }

  ngOnInit() {
    this.advertService.getAdverts().subscribe( (res: Advert[]) => {
      this.adverts = res;
    });
  }

  public getMoreAdverts() {
    this.advertService.getMore12(this.adverts);
  }
}
