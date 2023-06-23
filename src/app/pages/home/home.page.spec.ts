import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    });
    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve ir para tela de lista de itens', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.listagem();
    tick(1500);
    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls']);
  }));

  it('deve ir para tela de criar novo de item', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.novoItem();
    tick(1500);
    expect(router.navigate).toHaveBeenCalledWith(['pickup-call']);
  }));
});
