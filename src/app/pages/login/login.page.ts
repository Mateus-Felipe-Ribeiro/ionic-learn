import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  forgotEmailPassword(){
    this.store.dispatch(show());

    setTimeout(() => {
      this.store.dispatch(hide());
    }, 3000)
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
