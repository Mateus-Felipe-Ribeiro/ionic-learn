import { createAction } from "@ngrx/store";
import { LoginState } from "./LoginState";
import { loginReducer } from "./login.reducers";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { AppInitialState } from "../AppInitialState";


describe('Loading store', () => {

  it('recoverPassword', () => {
    //@ts-ignore
    const initialState: LoginState = AppInitialState.loading;
    const newState = loginReducer(initialState, recoverPassword());
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    })
  })

  it('recoverPasswordSuccess', () => {
    //@ts-ignore
    const initialState: LoginState = AppInitialState.loading;
    const newState = loginReducer(initialState, recoverPasswordSuccess());
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    })
  })

  it('recoverPasswordFail', () => {
    //@ts-ignore
    const initialState: LoginState = AppInitialState.loading;
    const error = {error: 'error'};
    const newState = loginReducer(initialState, recoverPasswordFail({error}));
    expect(newState).toEqual({
      ...initialState,
      error,
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    })
  })
})
