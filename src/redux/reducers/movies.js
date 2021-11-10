import * as type from '../types';

const initialState = {
  movies: [],
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case type.GET_MOVIES:
      return {
        ...state,
        movies: action.payload
      }
    default:
      return state
  }
}