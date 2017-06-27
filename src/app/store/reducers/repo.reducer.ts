import {Action} from "@ngrx/store";

export interface Links {
  git: string;
  self: string;
  html: string;
}

export interface Readme {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  _links: Links;
}


export interface RepoState {
  readme: Readme;
  readmeError: boolean;
}

const moduleName = 'REPO';

export const REPO_CONSTANTS = {
  LOAD: `${moduleName}/LOAD`,
  README_RECEIVED: `${moduleName}/README_RECEIVED`,
  README_RECEIVE_ERROR: `${moduleName}/README_RECEIVE_ERROR`,
  RESET: `${moduleName}/RESET`
};

const initialState: RepoState = {
  readme: null,
  readmeError: false
};

export function repoReducer(state: RepoState = initialState, action: Action): RepoState {
  switch (action.type) {
    case REPO_CONSTANTS.README_RECEIVED:
      return {
        readmeError: false,
        readme: action.payload
      };
    case REPO_CONSTANTS.README_RECEIVE_ERROR:
      return {
        ...state,
        readmeError: true
      };
    case REPO_CONSTANTS.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export const REPO_ACTIONS = {
  LOAD: (payload) => {
    return {
      type: REPO_CONSTANTS.LOAD,
      payload
    };
  },
  README_RECEIVED: (payload: string) => {
    return {
      type: REPO_CONSTANTS.README_RECEIVED,
      payload
    };
  },
  README_RECEIVE_ERROR: () => {
    return {
      type: REPO_CONSTANTS.README_RECEIVE_ERROR
    };
  },
  RESET: () => {
    return {
      type: REPO_CONSTANTS.RESET
    };
  }
};
