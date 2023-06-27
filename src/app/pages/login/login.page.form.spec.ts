import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginPageForm } from "./login.page.form";

describe('LoginPageForm', () => {

  let loginPageForm: LoginPageForm;
  let form: FormGroup;

  beforeEach(() => {
    loginPageForm = new LoginPageForm(new FormBuilder());
    form = loginPageForm.createForm();
  })


  it('cria formulario vazio', () => {
    expect(form).not.toBeNull();
    expect(form.get('email')).not.toBeNull();
    expect(form.get('email')!.value).not.toEqual("");
    expect(form.get('email')!.valid).not.toBeFalsy();
    expect(form.get('password')).not.toBeNull();
    expect(form.get('password')!.value).not.toEqual("");
    expect(form.get('password')!.valid).not.toBeFalsy();
  })

  it('email valido', () => {
    form.get('email')?.setValue('invalid email');

    expect(form.get('email')?.valid).toBeFalsy();
  })

  it('esperado email ser valido', () => {
    form.get('email')?.setValue('valid@email.com');

    expect(form.get('email')?.valid).toBeTruthy();
  })

  it('formulario valido', () => {
    form.get('email')?.setValue('valid@email.com');
    form.get('password')?.setValue('senha1234');

    expect(form.valid).toBeTruthy();
  })
})
