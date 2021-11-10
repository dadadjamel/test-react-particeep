import * as type from '../types';

export function getMovies(movies) {
  return { 
    type: type.GET_MOVIES,
    payload: movies,
  }
}