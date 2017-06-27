import {Action} from "@ngrx/store";
export interface User {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface SearchState {
  users: User[]
}

const moduleName = 'SEARCH';

export const SEARCH_CONSTANTS = {
  LOAD_USERS: `${moduleName}/LOAD_USERS`,
  USERS_RECEIVED: `${moduleName}/USERS_RECEIVED`,
  USERS_LOADING_ERROR: `${moduleName}/USERS_LOADING_ERROR`,
  RESET: `${moduleName}/RESET`
};

const initialState: SearchState = {
  users: []
};

export function searchReducer(state: SearchState = initialState, action: Action): SearchState {
  switch (action.type) {
    case SEARCH_CONSTANTS.USERS_RECEIVED:
      return {
        users: action.payload
      };
    case SEARCH_CONSTANTS.USERS_LOADING_ERROR:
    case SEARCH_CONSTANTS.LOAD_USERS:
    case SEARCH_CONSTANTS.RESET:
      return {
        users: []
      };
    default: return state;
  }
}

export const SEARCH_ACTIONS = {
  LOAD_USERS: (payload: string) => {
    return {
      type: SEARCH_CONSTANTS.LOAD_USERS,
      payload
    };
  },
  USERS_RECEIVED: (payload: User[]) => {
    return {
      type: SEARCH_CONSTANTS.USERS_RECEIVED,
      payload
    };
  },
  USERS_LOADING_ERROR: () => {
    return {
      type: SEARCH_CONSTANTS.USERS_LOADING_ERROR
    };
  },
  RESET: () => {
    return {
      type: SEARCH_CONSTANTS.RESET
    }
  }
};
