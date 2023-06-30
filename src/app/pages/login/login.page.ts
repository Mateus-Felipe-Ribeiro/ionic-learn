import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form!: FormGroup;
  loginStateSubscription!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoveringPassword(loginState);

      this.onIsLoggingIn(loginState);
      this.onIsLoggedIn(loginState);

      this.onError(loginState);
      this.toggleLoading(loginState);
    })
  }

  ngOnDestroy(): void {
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(loginState: LoginState){
    if(loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }

  private onIsLoggingIn(loginState: LoginState){
    if(loginState.isLoggingIn){
      const email = this.emailForm.value;
      const password = this.passwordForm.value;
      this.authService.login(email, password).subscribe(
        user => {
          this.store.dispatch(loginSuccess({user}));
        },
        error => {
          this.store.dispatch(loginFail({error}));
        }
      );
    }
  }

  private onIsLoggedIn(loginState: LoginState){
    if(loginState.isLoggedIn){
      this.router.navigate(['home']);
    }
  }

  private onIsRecoveringPassword(loginState: LoginState){
    if(loginState.isRecoveringPassword){
      this.authService.recoverEmailPassword(this.emailForm.value).subscribe(
        () => {
          this.store.dispatch(recoverPasswordSuccess());
        },
        error => {
          this.store.dispatch(recoverPasswordFail({error}));
        }
      );
    }
  }

  private async onError(loginState: LoginState){
    if(loginState.error){
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        duration: 3000,
        color: 'danger'
      })
      toaster.present();
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Recovery email sent',
        duration: 3000,
        color: 'primary'
      })
      toaster.present();
    }
  }

  forgotEmailPassword(){
    // this.store.dispatch(show());
    this.store.dispatch(recoverPassword());

    // setTimeout(() => {
    //   this.store.dispatch(hide());
    // }, 3000)
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
    this.store.dispatch(login());
    // this.router.navigate(['home']);
  }

}
