import { ALL_MOVIES } from '../schemas/moviesSchemas';

export const addMovie = (_, variable, client) => {
  const { movies } = client.cache.readQuery({ query: ALL_MOVIES });
  const newMovie = {
    __typename: 'Movie',
    _id: variable._id,
    title: variable.title,
    overview: variable.overview,
    poster_path: variable.poster_path,
    popularity: variable.popularity
  };
  const newMovies = movies.concat(newMovie);
  client.cache.writeData({
    data: {
      movies: newMovies
    }
  });
  return newMovie;
};

export const updateMovie = (_, variable, client) => {
  const { movies } = client.cache.readQuery({ query: ALL_MOVIES });
  const updatedMovie = {
    __typename: 'Movie',
    _id: variable._id,
    title: variable.title,
    overview: variable.overview,
    poster_path: variable.poster_path,
    popularity: variable.popularity
  };
  let updatedMovieIndex = null;
  movies.forEach((movie, idx) => {
    if (movie._id === variable._id) {
      updatedMovieIndex = idx;
    }
  });
  movies[updatedMovieIndex] = updatedMovie;
  const updatedMovies = [...movies];
  client.cache.writeData({
    data: {
      movies: updatedMovies
    }
  });
  return updatedMovies;
};

export const deleteMovie = (_, variable, client) => {
  const { movies } = client.cache.readQuery({ query: ALL_MOVIES });
  const moviesAfterDeleted = movies.filter(movie => {
    return movie._id !== variable._id;
  });
  client.cache.writeData({
    data: {
      movies: moviesAfterDeleted
    }
  });
  return moviesAfterDeleted;
};
