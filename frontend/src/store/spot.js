import { csrfFetch } from "./csrf";

//! Actions
const GET_SPOTS = "spot/GET_SPOTS";

//! Action creators
const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

//! Thunk
export const getAllSpots = () => async(dispatch) => {
    const response = await fetch('/api/spots');
    if(response.ok) {
        const spots = await response.json();
        dispatch(getSpots(spots.Spots));
        return spots;
    }else {
        const error = await response.json();
        return error;
    }
}

//! Reducer
const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS: {
        const newState = {...state};
        action.spots.forEach((spot) => {
            newState[spot.id] = spot;
        })
        return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
