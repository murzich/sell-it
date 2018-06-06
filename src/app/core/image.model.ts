export class AdvertImage {
  pk: number;
  advert: number;
  file: string;
  constructor(json?: any) {
    if (!json) {
      this.advert = 0;
      this.pk = 0;
      // TODO: assign mock image in view component scope
      this.file = 'assets/img/no_image_available.jpg';
    } else {
      this.advert = json.advert;
      this.pk = json.pk;
      this.file = json.file;
    }
  }
}
