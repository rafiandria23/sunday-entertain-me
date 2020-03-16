import { createStore } from 'redux';

const initialState = {
  searchQuery: ''
};

export const searchOnChange = searchQuery => ({
  type: 'SEARCH',
  payload: {
    searchQuery
  }
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return { ...state, searchQuery: action.payload.searchQuery };

    default:
      return state;
  }
};

export const store = createStore(reducer);
