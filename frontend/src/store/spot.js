import { csrfFetch } from "./csrf";

//! Actions
const GET_SPOTS = "spot/GET_SPOTS";
const GET_ONE_SPOT = "spot/GET_ONE_SPOT";

//! Action creators
const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};


const getSingleSpot = (spot) => {
    return {
        type: GET_ONE_SPOT,
        spot,
    }
}

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
};

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
      const spot = await response.json();
      dispatch(getSingleSpot(spot));
      return spot;
    } else {
      const error = await response.json();
      return error;
    }
  };
  

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
    case GET_ONE_SPOT: {
        const newState = {...state};
        newState[action.spot.id] = action.spot;
        return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
