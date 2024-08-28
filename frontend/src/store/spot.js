import { csrfFetch } from "./csrf";

//! Actions
const GET_SPOTS = "spot/GET_SPOTS";
const GET_ONE_SPOT = "spot/GET_ONE_SPOT";

const CREATE_SPOT = "spot/CREATE_SPOT";
const DELETE_SPOT = "spot/DELETE_SPOT";

const CREATE_IMAGE = "image/CREATE_IMAGE";

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
  };
};

const addSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

const removeSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

const createImage = (spot) => {
  return {
    type: CREATE_IMAGE,
    payload: spot,
  };
};

//! Thunk
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    dispatch(getSpots(spots.Spots));
    return spots;
  } else {
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

export const loadCurrentSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  if (response.ok) {
    const spots = await response.json();
    dispatch(getSpots(spots.Spots));
    return spots.Spots;
  } else {
    const error = await response.json();
    return error;
  }
};

export const createSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const newSpot = await response.json();
    dispatch(addSpot(newSpot));
    dispatch(getAllSpots());
    return newSpot;
  } else {
    const error = await response.json();
    return error.errors;
  }
};

export const editSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(addSpot(updatedSpot));
    return updatedSpot;
  } else {
    const error = await response.json();
    return { errors: error.errors };
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeSpot(spotId));
    return { message: "Successfully deleted" };
  } else {
    const error = await response.json();
    return error;
  }
};

// Add Image Thunk
export const addImage = (image) => async (dispatch) => {
  const { spotId, url, preview } = image;
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, preview }),
  });
  if (response.ok) {
    const newImage = await response.json();
    dispatch(createImage(newImage));
    return newImage;
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
      const newState = { ...state };
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case GET_ONE_SPOT: {
      const newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    }
    case CREATE_SPOT: {
      const newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    case CREATE_IMAGE: {
      return { ...state, [action.payload.id]: action.image };
    }
    default:
      return state;
  }
};

export default spotsReducer;
