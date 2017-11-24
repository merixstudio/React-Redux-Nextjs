import fetch from 'node-fetch';

const prefix = '[Cards]';

export const cardsActionsTypes = {
  SEARCH_REQUEST: `${prefix} Search Request`,
  SEARCH_SUCCESS: `${prefix} Search Success`,
  SEARCH_ERROR: `${prefix} Search Error`,
};

export const searchRequest = () => ({ type: cardsActionsTypes.SEARCH_REQUEST });
export const searchSuccess = results => ({ type: cardsActionsTypes.SEARCH_SUCCESS, results });
export const searchError = errors => ({ type: cardsActionsTypes.SEARCH_ERROR, errors });

export const fetchCards = (selectedFormat, searchPhrase) => {
  return async (dispatch) => {
    dispatch(searchRequest());
    const response = await fetch(`https://api.scryfall.com/cards/search?q=f:${selectedFormat}+${searchPhrase}`);
    const json = await response.json();
    if (json.status === 200) {
      return dispatch(searchSuccess(json.data));
    } else {
      return dispatch(searchError([json.details]));
    }
  };
};
