export class AdvertImage {
  advert?: number;
  file: string;
  pk?: number;

  constructor(json: any = {}) {
    this.advert = json.advert;
    this.file = json.file || 'assets/img/no_image_available.jpg';
    this.pk = json.pk;
  }
}
