import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Profile } from '../profile.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProfileService } from '../profile.service';
import { ActivatedRoute } from '@angular/router';

function passwordConfirming(c: AbstractControl): any {
  if(!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('confirmPassword');

  if(!pwd || !cpwd) return ;
  if (pwd.value !== cpwd.value) {
      return { invalid: true };
  }
}

@Component({
  selector: 'glui-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  groupForm: FormGroup;
  profile: Profile;
  isNew = true;
  notShowAux = false;
  spinnerOn = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  filteredJobs: Observable<string[]>;
  allJobs: string[] = ['Motorista', 'Varredor', 'Limpeza', 'Cantoneiro', 'Aspirador'];

  @ViewChild('jobInput') jobInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    ){

    }

  ngOnInit() {

     this.profile = {
        id: '',
        user_uid: '',
        name: '',
        lastname: '',
        active: true,
        jobs: [],
        email: ''
      }


    const id = this.route.snapshot.paramMap.get('id');
    if( id!==null ) {
    this.profileService.getProfile(id).subscribe(
      _profile => {
        this.profile = _profile;
        this.isNew = false;
        this.setProfileForm();
      });
    }
    this.setProfileForm();
    this.filteredJobs = this.profileForm.get('jobs').valueChanges.pipe(
      startWith(null),
      map((job: string | null) => job ? this._filter(job) : this.allJobs.slice()));
  }

  ngOnDestroy(): void {
    this.profileService.resetDocument();
  }

  setProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.profile.name, Validators.required],
      lastname: [this.profile.lastname, Validators.required],
      active: [this.profile.active],
      jobs: [ this.profile.jobs, Validators.required],
      email: [this.profile.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
    });

    this.groupForm = this.formBuilder.group({
      profileForm: this.profileForm,
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, passwordConfirming]],
    });
  }

  get f() { return this.profileForm.controls; }
  get fg() { return this.groupForm.controls; }

  submit(): void {
    this.spinnerOn = true;
    if(this.isNew){
      this.addProfile();
    }
    else {
      this.updateProfile();
    }
  }

  addProfile():void {
    this.profile = this.profileForm.value;
    const displayName = `${this.profile.name}${this.profile.lastname}`;
    this.profile.user_uid = displayName.toLowerCase();
    this.profileService.addProfile(this.profile)
    .subscribe(_profile => {
        if(_profile){
          this.finish();
        }
      },
      error => {
        this.errorHandler(error);
      }
    )
  }

  updateProfile(): void {
    this.profile = this.profileForm.value;
    this.profileService.updateProfile(this.profile)
    .subscribe(() => {
      this.finish();
    },
    error => {
      this.errorHandler(error);
    }
    );
  }

  finish(): void {
    this.spinnerOn = false;
    this.location.back();
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.profile.jobs.push(value.trim());
        this.profileForm.get('jobs').setValue(this.profile.jobs);
      }

      if (input) {
        input.value = '';
      }
    }
  }

  remove(job: string): void {
    const index = this.profile.jobs.indexOf(job);

    if (index >= 0) {
      this.profile.jobs.splice(index, 1);
      this.profileForm.get('jobs').setValue(this.profile.jobs);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.profile.jobs.push(event.option.viewValue);
    this.jobInput.nativeElement.value = '';
    this.profileForm.get('jobs').setValue(this.profile.jobs);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allJobs.filter(
      job => job.toLowerCase().indexOf(filterValue) === 0);
  }

  cancel(): void {
    this.location.back();
  }

  errorHandler(error: string): void{
    console.log(error);
  }

}
