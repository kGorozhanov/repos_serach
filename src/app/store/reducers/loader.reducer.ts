import {Action} from "@ngrx/store";

/**
 * DEFINE LOADER STATE INTERFACE
 */
export interface LoaderState {
  count: number;
  active: boolean;
}

/**
 * DEFINE LOCAL MODULE NAME
 * @type {string}
 */
const moduleName = 'LOADER';

/**
 * DEFINE LOADER TRIGGERS
 * @type {{TOGGLE: string}}
 */
export const LOADER_CONSTANTS = {
  TOGGLE: `${moduleName}/TOGGLE`
};

/**
 * DEFINE LOADER INITIAL STATE
 * @type {{count: number; active: boolean}}
 */
const initialState: LoaderState = {
  count: 0,
  active: false
};

/**
 * PURE LOADER REDUCER FUNCTION
 * @param state
 * @param action
 * @returns {any}
 */
export function loaderReducer (state: LoaderState = initialState, action: Action): LoaderState {
  switch (action.type) {
    case LOADER_CONSTANTS.TOGGLE:
      const count = state.count + action.payload;
      return {
        count,
        active: count !== 0
      };
    default: return state;
  }
}

/**
 * LOADER ACTIONS CREATORS
 * @type {{TOGGLE: ((payload:number)=>Action)}}
 */
export const LOADER_ACTIONS = {
  TOGGLE: (payload: number): Action => {
    return {
      type: LOADER_CONSTANTS.TOGGLE,
      payload
    };
  }
};
