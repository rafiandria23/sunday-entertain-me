const initialState = {
  movies: [],
  currentMovie: ''
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES':
      return { ...state, movies: state.movies.concat(action.payload.movies) };

    default:
      return state;
  }
};

export default moviesReducer;
