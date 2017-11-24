import { cardsActionsTypes } from '../actions/cardsActions';

const initialState = {
  results: [],
  details: {},
  errors: [],
  isFetching: false,
};

function cards(state = initialState, action) {
  switch (action.type) {
    case cardsActionsTypes.SEARCH_REQUEST:
    case cardsActionsTypes.RANDOM_CARD_REQUEST: {
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
    case cardsActionsTypes.RANDOM_CARD_SUCCESS:
    case cardsActionsTypes.CARD_DETAILS_SUCCESS: {
      return {
        ...state,
        details: action.details,
        isFetching: false,
      };
    }
    case cardsActionsTypes.RANDOM_CARD_ERROR:
    case cardsActionsTypes.CARD_DETAILS_ERROR: {
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
