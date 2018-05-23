import { Component, OnInit } from '@angular/core';

import { IProduct } from './product.interface';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './productPage.component.html',
  styleUrls: ['./productPage.component.scss'],
  providers: [ProductService]
})
export class ProductPageComponent implements OnInit {
  public products: IProduct[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProductList(this.productService.getList());
  }

  private getProductList(productList: IProduct[]): void {
    this.products = productList;
  }
  public getMoreItems() {
    this.productService.getMore12();
  }
}
