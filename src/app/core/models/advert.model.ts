import { AdvertImage } from './image.model';
import { LocationApi } from './location.model';
import { User } from './user.model';

// TODO: Joint classes

/**
 * Implements adverts in the advert list view.
 */
export class Advert {
  // TODO: Parse string by `new Date("...");`
  activatedAt?: Date;
  category?: any;
  contractPrice?: boolean;
  currency?: number;
  id: number;
  pk?: number;
  images: AdvertImage[];
  is_active?: boolean;
  location?: LocationApi;
  theme: string;

  constructor(json: any) {
    try {
      this.images = json.images.map((image: any) => new AdvertImage(image));
    } catch (e) {
      // The error is occurring only on an unit testing.
      // console.log('Advert images was undefined! Defined they as empty array in model.');
      this.images = [];
    }
    if (this.images.length === 0) {
      this.images.push(new AdvertImage());
    }
    this.id = json.pk;
    this.pk = json.pk;
    this.theme = json.theme;
  }
}

/**
 * Implements advert in the detail page.
 */
export class AdvertFull extends Advert {
  owner: User;
  price: number;
  text: string;

  constructor(json: any) {
    super(json);
    this.owner = new User(json.owner);
    this.price = json.price;
    this.text = json.text;
  }
}

/**
 * Class of advert for POSTing to the backend.
 */
export class AdvertCreate {
  contract_price?: boolean;
  currency?: number;
  is_active?: boolean;
  location?: LocationApi | number;
  price?: number;
  text?: string;
  theme: string;
  constructor(json: AdvertCreate) {
    this.contract_price = json.contract_price;
    this.currency = json.currency;
    this.is_active = json.is_active;
    // TODO: sever takes location only as it's id in number type (or converts from string)
    this.location = LocationApi.numberForAdvertCreation(json.location);
    this.price = (json.price === null) ? undefined : json.price;
    this.text = json.text;
    this.theme = json.theme;
  }
}
