import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AdvertFull } from '../core/models/advert.model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
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
      );
  }
}
