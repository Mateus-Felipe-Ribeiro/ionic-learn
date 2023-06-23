import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { LoaderPage } from './loader.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    })
    fixture = TestBed.createComponent(LoaderPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve ir para tela de login depois de carregado', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.ngOnInit();
    tick(1500);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));
});
