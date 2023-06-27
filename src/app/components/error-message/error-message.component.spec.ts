import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorMessageComponent } from './error-message.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mostrar mensagem de erro ao campo ser tocado e campo invalido', () => {
    component.field = new FormGroup({anyField: new FormControl()})

    component.field.markAsTouched();
    component.field.setErrors({anyError: true});
    component.error = 'anyError';

    expect(component.mostrarComponente()).toBeTruthy();
  })

  // it('mostrar mensagem de erro ao campo ser tocado e ser diferente de vazio', () => {
  //   component.field = new FormGroup({email: new FormControl()})

  //   component.field.markAsTouched();
  //   component.field.setErrors({email: true});
  //   component.error = 'email';

  //   expect(component.mostrarComponente()).toBeTruthy();
  // })

  it('esconder error se o campo não foi tocado', () => {
    component.field = new FormGroup({anyField: new FormControl()})

    component.field.markAsTouched();
    component.field.setErrors({anyError: true});
    component.error = 'anyError';

    expect(component.mostrarComponente()).toBeFalsy();
  })

  it('esconder error se o campo for valido', () => {
    component.field = new FormGroup({anyField: new FormControl()})

    component.field.markAsTouched();
    component.error = 'anyError';

    expect(component.mostrarComponente()).toBeFalsy();
  })

  it('esconder mensagem se o campo for tocado e invalido, mas o erro é diferente', () => {
    component.field = new FormGroup({anyField: new FormControl()})

    component.field.markAsTouched();
    component.field.setErrors({anyError: true});
    component.error = 'anotherError';

    expect(component.mostrarComponente()).toBeFalsy();
  })
});
