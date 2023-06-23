import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    });
    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
});
