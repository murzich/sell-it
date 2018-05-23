import { IProduct } from './product.interface';

export class ProductService {
  private products: IProduct[] = [
    {
      id: 0,
      name: 'Stuff',
      image: 'assets/img/prod-item_1.jpg'
    },
    {
      id: 1,
      name: 'Closes',
      image: 'assets/img/prod-item_2.jpg'
    },
    {
      id: 2,
      name: 'Laptop',
      image: 'assets/img/prod-item_3.jpg'
    },
    {
      id: 3,
      name: 'Notebook',
      image: 'assets/img/prod-item_4.jpg'
    }, {
      id: 4,
      name: 'Stuff',
      image: 'assets/img/prod-item_1.jpg'
    },
    {
      id: 5,
      name: 'Closes',
      image: 'assets/img/prod-item_2.jpg'
    },
    {
      id: 6,
      name: 'Laptop',
      image: 'assets/img/prod-item_3.jpg'
    },
    {
      id: 7,
      name: 'Notebook',
      image: 'assets/img/prod-item_4.jpg'
    },
    {
      id: 8,
      name: 'Stuff',
      image: 'assets/img/prod-item_1.jpg'
    },
    {
      id: 9,
      name: 'Closes',
      image: 'assets/img/prod-item_2.jpg'
    },
    {
      id: 10,
      name: 'Laptop',
      image: 'assets/img/prod-item_3.jpg'
    },
    {
      id: 11,
      name: 'Notebook',
      image: 'assets/img/prod-item_4.jpg'
    },
  ];
  getList(): IProduct[] {
    return this.products;
  }
  getMore12(): IProduct[] {
    this.products.push(...this.products.slice(0, 12));
    return this.products;
  }
}
