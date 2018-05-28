import { User } from './user.model';
import { AdvertImage } from './image.model';

export class Advert {
  public id: number;
  public theme: string;
  public images: AdvertImage[];
  public owner?: User;
  public text?: string;
  public price?: number;
  public currency?: number;
  public contractPrice?: boolean;
  public location?: any;
  public category?: any;
  // TODO: Parse string by `new Date("...");`
  public activatedAt?: Date;
  public isActive?: boolean;

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
    this.owner = new User(json.owner);
    this.text = json.text;
    this.price = json.price;
  }
}
