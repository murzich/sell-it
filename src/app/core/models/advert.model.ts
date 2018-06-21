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
  images: AdvertImage[];
  isActive?: boolean;
  location?: LocationApi;
  theme: string;

  constructor(json: any) {
    this.images = json.images.map((image: any) => new AdvertImage(image));
    if (this.images.length === 0) {
      this.images.push(new AdvertImage());
    }
    this.id = json.pk;
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
  isActive?: boolean;
  location?: LocationApi;
  price?: number;
  text?: string;
  theme: string;
}
