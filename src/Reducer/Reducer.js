import {
  FLIGHT_LIST_REQUEST,
  FLIGHT_LIST_SUCCESS,
  FLIGHT_LIST_FAILED,
  FILTER_FLIGHT_LIST,
} from "../Constants/Constants";

function flightsReducer(state = { loading: true, flightlist: [] }, action) {
  switch (action.type) {
    case FLIGHT_LIST_REQUEST:
      return { loading: true, flightlist: [] };
    case FLIGHT_LIST_SUCCESS:
      return {
        loading: false,
        flightlist: action.payload,
        filteredflightList: action.payload,
        filter: { year: [], launch: "All", landing: "All" },
      };
    case FLIGHT_LIST_FAILED:
      return { loading: false, error: action.payload };
    case FILTER_FLIGHT_LIST:
      const filter = state.filter;
      const filterkey = action.payload.filteraction;

      if (filterkey === "year") {
        if (action.payload.type === "Add") {
          if (filter[filterkey]) {
            filter[filterkey].push(action.payload.filterValue);
          }
        } else {
          if (filter[filterkey]) {
            const tempfilter_v1 = filter[filterkey].filter((value) => {
              return value !== action.payload.filterValue;
            });
            filter[filterkey] = tempfilter_v1;
          }
        }

        filter[filterkey] = [...new Set(filter[filterkey])];
      } else {
        filter[filterkey] = action.payload.filterValue;
      }

      var tempFilteredFlights = [];
      filter.year.sort();

      filter.year.forEach((value, index) => {
        const loopFilterdvalues = state.flightlist.filter((v, i) => {
          return v.launch_year == value;
        });

        if (loopFilterdvalues.length > 0) {
          tempFilteredFlights = [...tempFilteredFlights, ...loopFilterdvalues];
        }
      });

      if (filter["year"].length === 0) {
        tempFilteredFlights = state.flightlist;
      }

      if (filter.launch !== "All") {
        const loopFilterdvalues = tempFilteredFlights.filter((v, i) => {
          return v.launch_success === filter.launch;
        });

        tempFilteredFlights = loopFilterdvalues;
      }

      if (filter.landing !== "All") {
        const loopFilterdvalues = tempFilteredFlights.filter((v, i) => {
          if (filter.landing) {
            return (
              v.rocket.first_stage.cores[0].land_success === filter.landing
            );
          } else {
            return (
              v.rocket.first_stage.cores[0].land_success === filter.landing ||
              v.rocket.first_stage.cores[0].land_success === null
            );
          }
        });
        tempFilteredFlights = loopFilterdvalues;
      }

      return {
        ...state,
        filter,
        filteredflightList: tempFilteredFlights,
      };
    default:
      return state;
  }
}

export { flightsReducer };
