import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { PickupCallPage } from './pickup-call.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('PickupCallPage', () => {
  let component: PickupCallPage;
  let fixture: ComponentFixture<PickupCallPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PickupCallPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    });
    fixture = TestBed.createComponent(PickupCallPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve ir para tela de listagem', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.registrar();
    tick(1500);
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  }));
});
