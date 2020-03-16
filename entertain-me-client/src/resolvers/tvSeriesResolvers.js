import { ALL_TV_SERIES } from '../schemas/tvSeriesSchemas';

export const addTvSeries = (_, variable, client) => {
  const { tvSeries } = client.cache.readQuery({ query: ALL_TV_SERIES });
  const newTvSeries = {
    __typename: 'TvSeries',
    _id: variable._id,
    title: variable.title,
    overview: variable.overview,
    poster_path: variable.poster_path,
    popularity: variable.popularity
  };
  const newTvSeriesList = tvSeries.concat(newTvSeries);
  client.cache.writeData({
    data: {
      tvSeries: newTvSeriesList
    }
  });
  return newTvSeriesList;
};

export const updateTvSeries = (_, variable, client) => {
  const { tvSeries } = client.cache.readQuery({ query: ALL_TV_SERIES });
  const updatedTvSeries = {
    __typename: 'TvSeries',
    _id: variable._id,
    title: variable.title,
    overview: variable.overview,
    poster_path: variable.poster_path,
    popularity: variable.popularity
  };
  let updatedTvSeriesIndex = null;
  tvSeries.forEach((tvSeriesItem, idx) => {
    if (tvSeriesItem._id === variable._id) {
      updatedTvSeriesIndex = idx;
    }
  });
  tvSeries[updatedTvSeriesIndex] = updatedTvSeries;
  const updatedTvSeriesList = [...tvSeries];
  client.cache.writeData({
    data: {
      tvSeries: updatedTvSeriesList
    }
  });
  return updatedTvSeriesList;
};

export const deleteTvSeries = (_, variable, client) => {
  const { tvSeries } = client.cache.readQuery({ query: ALL_TV_SERIES });
  const tvSeriesAfterDeleted = tvSeries.filter(tvSeriesItem => {
    return tvSeriesItem._id !== variable._id;
  });
  client.cache.writeData({
    data: {
      tvSeries: tvSeriesAfterDeleted
    }
  });
  return tvSeriesAfterDeleted;
};
