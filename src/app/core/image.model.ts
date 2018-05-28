export interface ImageModel {
  pk: number;
  advert: number;
  file: string;
}

export class AdvertImage {
  pk: number;
  advert: number;
  file: string;
  constructor(json?: any) {
    if (!json) {
      this.advert = 0;
      this.pk = 0;
      this.file = 'assets/img/no_image_available.jpg';
    } else {
      this.advert = json.advert;
      this.pk = json.pk;
      this.file = json.file;
    }
  }
}
