import { Component, OnInit } from '@angular/core';

import { Advert } from '../core/advert.model';
import { AdvertService } from '../core/advert.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  providers: []
})
export class ProductPageComponent implements OnInit {
  adverts: Advert[];
  isReadyToScroll: boolean;
  page: number;

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

  getMoreAdverts() {
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
