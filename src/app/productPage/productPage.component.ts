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
  public page: number;
  public isReadyToScroll: boolean;
  constructor(private advertService: AdvertService) {
    this.isReadyToScroll = true;
  }

  ngOnInit() {
    this.advertService.getAdverts()
      .subscribe(
        (res: Advert[]) => { this.adverts = res; },
        err => console.error(err),
        () => {
          this.page = 1;
        }
      );
  }

  public getMoreAdverts() {
    this.isReadyToScroll = false;
    this.advertService.getNext(this.page)
      .subscribe(
        (res: Advert[]) => { this.adverts = this.adverts.concat(res); },
        err => console.error(err),
        () => {
          this.page++;
          this.isReadyToScroll = (this.advertService.nextPage !== null);
        }
      );
  }
}