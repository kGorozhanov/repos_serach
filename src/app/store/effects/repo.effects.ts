import {Injectable} from "@angular/core";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Http, Headers} from "@angular/http";
import {REPO_CONSTANTS, REPO_ACTIONS} from "../reducers/repo.reducer";
import {LOADER_ACTIONS} from "../reducers/loader.reducer";

@Injectable()
export class RepoEffects {
  constructor(private actions: Actions, private http: Http) {
  }

  @Effect()
  load$ = this.actions
    .ofType(REPO_CONSTANTS.LOAD)
    .map(toPayload)
    .mergeMap(({username, repo}) => {
      const headers = new Headers();
      headers.append('Accept', 'application/vnd.github.v3.html');
      return this.http.get(`https://api.github.com/repos/${username}/${repo}/readme`, { headers })
        .mergeMap(response => {
          return [REPO_ACTIONS.README_RECEIVED(response['_body']), LOADER_ACTIONS.TOGGLE(-1)]
        })
        .catch(err => [REPO_ACTIONS.README_RECEIVE_ERROR(), LOADER_ACTIONS.TOGGLE(-1)])
        .startWith(LOADER_ACTIONS.TOGGLE(1));
    })
}
