import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  get emailForm() {
    return this.form.get('email') as FormGroup;
  }
  get passwordForm() {
    return this.form.get('password') as FormGroup;
  }

  register(): void {
    this.router.navigate(['register']);
  }

  login(): void {
    this.router.navigate(['home']);
  }

}
