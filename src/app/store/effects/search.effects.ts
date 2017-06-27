import {Actions, Effect} from "@ngrx/effects";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {SEARCH_CONSTANTS, User, SEARCH_ACTIONS} from "../reducers/search.reducer";
import {LOADER_ACTIONS} from "../reducers/loader.reducer";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';

@Injectable()
export class SearchEffects {
  constructor(private actions: Actions, private http: Http) {}

  @Effect()
  loadUsers$ = this.actions
    .ofType(SEARCH_CONSTANTS.LOAD_USERS)
    .mergeMap(action => {
      return this.http.get(`https://api.github.com/search/users?q=${action.payload}`)
        .map(res => res.json())
        .mergeMap(result => [SEARCH_ACTIONS.USERS_RECEIVED(result.items), LOADER_ACTIONS.TOGGLE(-1)])
        .catch(err => [SEARCH_ACTIONS.USERS_LOADING_ERROR(), LOADER_ACTIONS.TOGGLE(-1)])
        .startWith(LOADER_ACTIONS.TOGGLE(1));
    })
}
