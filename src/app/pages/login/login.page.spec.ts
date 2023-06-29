import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducer';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from '@capacitor/app';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('login', loginReducer),
      ]
    });

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('criar formulario ao iniciar', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined()
  })

  it('deve ir para tela home ao fazer login', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.login();
    tick(1500);
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  }));

  it('deve ir para tela registro', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.register();
    tick(1500);
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  }));

  it('deve recuperar email e senha', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    page.querySelector("#recoverPasswordButton").click();
    //@ts-ignore
    store.select('login').subscribe(loginState => {
      //@ts-ignore
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
  })

  it('mostrar loading ao recuperar senha', () => {
    fixture.detectChanges();
    store.dispatch(recoverPassword());
    //@ts-ignore
    store.select('loading').subscribe(loadingState => {
      //@ts-ignore
      expect(loadingState.show).toBeTruthy();
    })
  })

  it('esconder loading e mensagem sucesso ao recuperar senha', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());
    //@ts-ignore
    store.select('loading').subscribe(loadingState => {
      //@ts-ignore
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('esconder loading e mensagem erro ao recuperar senha', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({error: 'message'}));
    //@ts-ignore
    store.select('loading').subscribe(loadingState => {
      //@ts-ignore
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })
});
