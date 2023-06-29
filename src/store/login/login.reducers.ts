import { createReducer, on } from "@ngrx/store";
import { LoginState } from "./LoginState";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { AppInitialState } from "../AppInitialState";

//@ts-ignore
const initialState: LoginState = AppInitialState.loading;

const reducer = createReducer(
  initialState,
  on(recoverPassword, (currentState: any) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),
  on(recoverPasswordSuccess, (currentState: any) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),
  on(recoverPasswordFail, (currentState: any, action: any) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    };
  }),
  on(login, (currentState: any) => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true,
    };
  }),
  on(loginSuccess, (currentState: any) => {
    return {
      ...currentState,
      isLoggedIn: true,
      isLoggingIn: false,
    };
  }),
  on(loginFail, (currentState: any, action: any) => {
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false,
    };
  }),
)

export function loginReducer(state: LoginState, action: any){
  return reducer(state, action);
}
