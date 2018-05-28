import { Component, OnInit } from '@angular/core';
import { AdvertFull } from '../core/advert.model';
import { AdvertService } from '../core/advert.service';
import { User } from '../core/user.model';
import { ImageModel } from '../core/image.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detailPage.component.html',
  styleUrls: ['./detailPage.component.scss']
})
export class DetailPageComponent implements OnInit {
  advert: AdvertFull;
  id: number;

  constructor(public advertService: AdvertService, public route: ActivatedRoute) {
    // TODO: added to prevent errors to console before obtaining advert data from API
    this.advert = {} as AdvertFull;
    this.advert.owner = {} as User;
    this.advert.images = [{}] as ImageModel[];
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap( params => this.advertService.readAdvert(+params['id'])),
        map(res => new AdvertFull(res))
      )
      .subscribe(
        res => this.advert = res,
        err => console.error(err),
        () => console.log('complete reading advert')
      );
  }
}
