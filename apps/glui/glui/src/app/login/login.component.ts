import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User, Email } from '../core/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'glui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private authServ: AuthService, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });

  }

  get f() { return this.loginForm.controls; }

  login(): void{
    //const email = {email: "slsspinola@gmail.com", password: "qwerty"};
    const email: Email = {email: this.f.email.value, password: this.f.password.value};
    this.authServ.login(email)
  }
  

}
