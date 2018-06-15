import { AdvertImage } from './image.model';
import { UserProfile, UserProfileModel } from './user.model';

export class Advert {
  // TODO: Parse string by `new Date("...");`
  activatedAt?: Date;
  category?: any;
  contractPrice?: boolean;
  currency?: number;
  id: number;
  images: AdvertImage[];
  isActive?: boolean;
  location?: any;
  owner?: UserProfileModel;
  price?: number;
  text?: string;
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

export class AdvertFull extends Advert {
  constructor(json: any) {
    super(json);
    this.owner = new UserProfile(json.owner);
    this.price = json.price;
    this.text = json.text;
  }
}
