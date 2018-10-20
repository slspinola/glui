import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'glui-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private location: Location,
              private formBuilder: FormBuilder) { 

              }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      active: ['', Validators.required],
      function: ['', Validators.required],
    });
  }

  cancel(): void {
    this.location.back();
  }

}
