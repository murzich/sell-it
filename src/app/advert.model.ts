export class Advert {
  public id: number;
  public theme: string;
  public images: string[];
  // TODO: Add Image object type; Or for this time use string[];
  // TODO: Add Owner object type;
  // public owner: any;
  // public text: string;
  // public price: number;
  // public currency: number;
  // public contractPrice: boolean;
  // public location: any;
  // public category: any;
  // TODO: Parse string by `new Date("...");`
  // public activatedAt: Date;
  // public isActive: boolean;

  constructor(json: any) {
    this.theme = json.theme;
    this.images = json.images.map((image: any) => image.file);
    this.id = json.pk;
  }
}
