import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './productItem.component.html',
  styleUrls: ['./productItem.component.scss']
})
export class ProductItemComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() image: string;
  constructor() { }
}
