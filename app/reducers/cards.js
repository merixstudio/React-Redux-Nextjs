import { cardsActionsTypes } from '../actions/cardsActions';

const initialState = {
  results: [],
  details: {},
  errors: [],
  isFetching: false,
};

function cards(state = initialState, action) {
  switch (action.type) {
    case cardsActionsTypes.SEARCH_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case cardsActionsTypes.SEARCH_SUCCESS: {
      return {
        ...state,
        results: action.results,
        isFetching: false,
      };
    }
    case cardsActionsTypes.SEARCH_ERROR: {
      return {
        ...state,
        results: [],
        errors: action.errors,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}

export default cards;
