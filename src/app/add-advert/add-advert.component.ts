import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AddAdvertService } from './add-advert.service';

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent implements OnInit {

  advertForm: FormGroup;

  constructor(private fb: FormBuilder, private addAdvertService: AddAdvertService) {
    this.advertForm = fb.group({
      theme: ['', Validators.required],
      text: '',
      price: 0,
      currency: 1,
      contract_price: false,
      location: this.fb.group({
        name: ''
      }),
      is_active: true
    });
  }

  get theme(): FormControl {return this.advertForm.get('theme') as FormControl; }

  ngOnInit() {
  }

  onSubmit() {
    this.addAdvertService.postAdvert(this.advertForm.value);
  }
}
