import fetch from 'node-fetch';

const prefix = '[Cards]';

export const cardsActionsTypes = {
  SEARCH_REQUEST: `${prefix} Search Request`,
  SEARCH_SUCCESS: `${prefix} Search Success`,
  SEARCH_ERROR: `${prefix} Search Error`,
  RANDOM_CARD_REQUEST: `${prefix} Random Card Request`,
  RANDOM_CARD_SUCCESS: `${prefix} Random Card Success`,
  RANDOM_CARD_ERROR: `${prefix} Random Card Error`,
};

export const searchRequest = () => ({ type: cardsActionsTypes.SEARCH_REQUEST });
export const searchSuccess = results => ({ type: cardsActionsTypes.SEARCH_SUCCESS, results });
export const searchError = errors => ({ type: cardsActionsTypes.SEARCH_ERROR, errors });
export const randomCardRequest = () => ({ type: cardsActionsTypes.RANDOM_CARD_REQUEST });
export const randomCardSuccess = details => ({ type: cardsActionsTypes.RANDOM_CARD_SUCCESS, details });
export const randomCardError = errors => ({ type: cardsActionsTypes.RANDOM_CARD_ERROR, errors });

export const fetchCards = (selectedFormat, searchPhrase) => {
  return async (dispatch) => {
    dispatch(searchRequest());
    const response = await fetch(`https://api.scryfall.com/cards/search?q=f:${selectedFormat}+${searchPhrase}`);
    const json = await response.json();
    if (response.status === 200) {
      return dispatch(searchSuccess(json.data));
    } else {
      return dispatch(searchError([json.details]));
    }
  };
};

export const fetchRandomCard = () => {
  return async (dispatch) => {
    dispatch(randomCardRequest());
    const response = await fetch('https://api.scryfall.com/cards/random');
    const json = await response.json();
    if (response.status === 200) {
      return dispatch(randomCardSuccess(json));
    } else {
      return dispatch(randomCardError(['Random Card Not Found']));
    }
  }
}
