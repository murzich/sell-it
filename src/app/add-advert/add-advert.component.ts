import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertCreate } from '../core/models/advert.model';
import { AdvertImage } from '../core/models/image.model';

import { AddAdvertService } from './add-advert.service';

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent {

  advertForm: FormGroup;
  imageControl = new FormControl('');
  images: AdvertImage[] = [];

  constructor(private fb: FormBuilder, private addAdvertService: AddAdvertService) {
    this.advertForm = fb.group({
      theme: ['', Validators.required],
      text: '',
      price: [0, Validators.min(0)],
      currency: 1,
      contract_price: false,
      location: '',
      is_active: true
    });
  }

  get theme(): FormControl {return this.advertForm.get('theme') as FormControl; }
  get price(): FormControl {return this.advertForm.get('price') as FormControl; }

  onSubmit() {
    this.addAdvertService.postAdvWithImages$(new AdvertCreate(this.advertForm.value), this.images)
      .subscribe(
        value => console.log(value),
        e => console.log(e),
        () => console.log('completed')
      );
  }

  /**
   * Encodes input files into base64
   * @param event target onClick
   * @return {void} push encoded results to <tt>this.images</tt> in callback
   */
  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.images.push(new AdvertImage({file: reader.result}));
          console.log(this.images);
        };
      }
    } else {
      this.images = [];
    }
  }
}
