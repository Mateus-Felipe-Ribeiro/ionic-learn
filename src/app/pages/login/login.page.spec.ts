import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducer';
import { loginReducer } from 'src/store/login/login.reducers';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;

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
  })
});
