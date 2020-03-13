const initialState = {
  tvSeries: [],
  currentTvSeries: null
};

const tvSeriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TV_SERIES':
      return {
        ...state,
        tvSeries: state.tvSeries.concat(action.payload.tvSeries)
      };

    default:
      return state;
  }
};

export default tvSeriesReducer;
