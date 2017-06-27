import {User} from "./search.reducer";
import {Action} from "@ngrx/store";

export interface Permissions {
  admin: boolean;
  push: boolean;
  pull: boolean;
}

export interface Repo {
  id: number;
  owner: User;
  name: string;
  full_name: string;
  description: string;
  private: boolean;
  fork: boolean;
  url: string;
  html_url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  hooks_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  mirror_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  homepage: string;
  language?: any;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  topics: string[];
  has_issues: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  pushed_at: Date;
  created_at: Date;
  updated_at: Date;
  permissions: Permissions;
  allow_rebase_merge: boolean;
  allow_squash_merge: boolean;
  allow_merge_commit: boolean;
  subscribers_count: number;
  network_count: number;
}

export interface UserState {
  user: User;
  repos: Repo[];
  userError: boolean;
  reposError: boolean;
}

const moduleName = 'USER';

export const USER_CONSTANTS = {
  LOAD_USER: `${moduleName}/LOAD_USER`,
  LOAD_REPOS: `${moduleName}/LOAD_REPOS`,
  USER_RECEIVED: `${moduleName}/USER_RECEIVED`,
  REPOS_RECEIVED: `${moduleName}/REPOS_RECEIVED`,
  USER_RECEIVE_ERROR: `${moduleName}/USER_RECEIVE_ERROR`,
  REPOS_RECEIVE_ERROR: `${moduleName}/REPOS_RECEIVE_ERROR`,
  RESET: `${moduleName}/RESET`
};

const initialState: UserState = {
  user: null,
  repos: [],
  userError: false,
  reposError: false
};

export function userReducer(state: UserState = initialState, action: Action): UserState {
  switch (action.type) {
    case USER_CONSTANTS.USER_RECEIVED:
      return {
        ...state,
        user: action.payload
      };
    case USER_CONSTANTS.REPOS_RECEIVED:
      return {
        ...state,
        repos: action.payload
      };
    case USER_CONSTANTS.REPOS_RECEIVE_ERROR:
      return {
        ...state,
        reposError: true
      };
    case USER_CONSTANTS.USER_RECEIVE_ERROR:
      return {
        ...state,
        userError: true
      };
    case USER_CONSTANTS.RESET:
      return {
        ...initialState
      };
    default: return state;
  }
}

export const USER_ACTIONS = {
  LOAD_USER: (payload: string) => {
    return {
      type: USER_CONSTANTS.LOAD_USER,
      payload
    };
  },
  LOAD_REPOS: (payload: string) => {
    return {
      type: USER_CONSTANTS.LOAD_REPOS,
      payload
    };
  },
  USER_RECEIVED: (payload: User) => {
    return {
      type: USER_CONSTANTS.USER_RECEIVED,
      payload
    };
  },
  REPOS_RECEIVED: (payload: Repo[]) => {
    return {
      type: USER_CONSTANTS.REPOS_RECEIVED,
      payload
    };
  },
  REPOS_RECEIVE_ERROR: () => {
    return {
      type: USER_CONSTANTS.REPOS_RECEIVE_ERROR
    }
  },
  USER_RECEIVE_ERROR: () => {
    return {
      type: USER_CONSTANTS.USER_RECEIVE_ERROR
    }
  },
  RESET: () => {
    return {
      type: USER_CONSTANTS.RESET
    }
  }
};