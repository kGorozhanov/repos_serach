import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Http} from "@angular/http";
import {USER_CONSTANTS, USER_ACTIONS} from "../reducers/user.reducer";
import {LOADER_ACTIONS} from "../reducers/loader.reducer";
@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private http: Http) {}

  @Effect()
  loadUser$ = this.actions
    .ofType(USER_CONSTANTS.LOAD_USER)
    .mergeMap(action => {
      return this.http.get(`https://api.github.com/users/${action.payload}`)
        .map(res => res.json())
        .mergeMap(user => [USER_ACTIONS.USER_RECEIVED(user), LOADER_ACTIONS.TOGGLE(-1)])
        .catch(err => [USER_ACTIONS.USER_RECEIVE_ERROR(), LOADER_ACTIONS.TOGGLE(-1)])
        .startWith(LOADER_ACTIONS.TOGGLE(1));
    });


  @Effect()
  loadRepos$ = this.actions
    .ofType(USER_CONSTANTS.LOAD_REPOS)
    .mergeMap(action => {
      return this.http.get(`https://api.github.com/users/${action.payload}/repos`)
        .map(res => res.json())
        .mergeMap(user => [USER_ACTIONS.REPOS_RECEIVED(user), LOADER_ACTIONS.TOGGLE(-1)])
        .catch(err => [USER_ACTIONS.REPOS_RECEIVE_ERROR(), LOADER_ACTIONS.TOGGLE(-1)])
        .startWith(LOADER_ACTIONS.TOGGLE(1));
    });
}
