import { Component, OnInit } from '@angular/core';
import { AdvertFull } from '../core/advert.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detailPage.component.html',
  styleUrls: ['./detailPage.component.scss']
})
export class DetailPageComponent implements OnInit {
  advert: AdvertFull;
  id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        data => this.advert = data.advert,
        err => console.error(err),
        () => console.log('complete reading advert')
      );
  }
}
