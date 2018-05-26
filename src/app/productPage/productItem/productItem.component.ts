import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './productItem.component.html',
  styleUrls: ['./productItem.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() image: string;
  constructor() { }

  ngOnInit() {
    this.image = !this.image ? '/assets/img/no_image_available.jpg' : this.image;
  }
}
