import { createAction, props } from "@ngrx/store";
import { User } from "src/app/types/user.type";

export const login = createAction(
  '[User] Login',
  props<{ user: User, remember: boolean }>(),
);

export const logout = createAction(
  '[User] Logout',
);
