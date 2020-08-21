import {
  FLIGHT_LIST_REQUEST,
  FLIGHT_LIST_SUCCESS,
  FLIGHT_LIST_FAILED,
  FILTER_FLIGHT_LIST,
} from "../Constants/Constants";

const getFlightList = () => (dispatch) => {
  dispatch({ type: FLIGHT_LIST_REQUEST });

  fetch("https://api.spacexdata.com/v3/launches?limit=100", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      dispatch({ type: FLIGHT_LIST_SUCCESS, payload: response });
    })
    .catch((e) => {
      dispatch({ type: FLIGHT_LIST_FAILED, payload: e.message });
    });
};

const doflightFilter = (filterValue, filteraction, type) => (dispatch) => {
  const tempPayload = { filterValue, filteraction, type };

  dispatch({ type: FILTER_FLIGHT_LIST, payload: tempPayload });
};

export { getFlightList, doflightFilter };
