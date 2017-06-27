import {routerReducer, RouterState} from '@ngrx/router-store';
import {LoaderState, loaderReducer} from "./reducers/loader.reducer";
import {SearchState, searchReducer} from "./reducers/search.reducer";
import {UserState, userReducer} from "./reducers/user.reducer";
import {RepoState, repoReducer} from "./reducers/repo.reducer";

/**
 * DEFINE APPLICATION STATE INTERFACE
 */
export interface AppState {
  router: RouterState;
  loader: LoaderState;
  search: SearchState;
  user: UserState;
  repo: RepoState;
}

/**
 * CREATING MAIN APP REDUCER
 * @type {{router: ((state:RouterState, action:Action)=>RouterState)}}
 */
export const appReducer = {
  router: routerReducer,
  loader: loaderReducer,
  search: searchReducer,
  user: userReducer,
  repo: repoReducer
};
