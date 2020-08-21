import React from "react";
import "../style.scss";
import { useDispatch } from "react-redux";
import { doflightFilter } from "../Actions/Actions";
import $ from "jquery";

const Filter = () => {
  const dispatch = useDispatch();

  const yearfilterFlights = (e, value, type) => {
    const selectedelem = document.getElementById(e.target.id);

    if (selectedelem.classList.contains("active")) {
      dispatch(doflightFilter(value, type, "Remove"));
      selectedelem.classList.remove("active");
    } else {
      selectedelem.classList.add("active");
      dispatch(doflightFilter(value, type, "Add"));
    }
  };

  const otherfilterFlights = (e, value, type) => {
    const selectedelem = document.getElementById(e.target.id);

    if (type == "launch") {
      if (selectedelem.classList.contains("active")) {
        $("#Launch-Filter .active").removeClass("active");
        dispatch(doflightFilter("All", type, "Remove"));
      } else {
        $("#Launch-Filter .active").removeClass("active");
        selectedelem.classList.add("active");
        dispatch(doflightFilter(value, type, "Remove"));
      }
    } else {
      if (selectedelem.classList.contains("active")) {
        $("#Landing-Filter .active").removeClass("active");
        dispatch(doflightFilter("All", type, "Remove"));
      } else {
        $("#Landing-Filter .active").removeClass("active");
        selectedelem.classList.add("active");
        dispatch(doflightFilter(value, type, "Remove"));
      }
    }
  };

  const years = [];

  for (let i = 1; i <= 15; i++) {
    years.push(i + 2005);
  }

  return (
    <div className="Container-Filter">
      <div className="Filter-Content">
        <div className="Filter-Heading">Filters</div>
        <div className="Year-Filter">
          <div className="Filter-Name">Launch Year</div>
          <div className="Filter">
            {years.map((value) => {
              return (
                <div
                  id={"year_" + value}
                  onClick={(e) => {
                    yearfilterFlights(e, value, "year");
                  }}
                  key={value}
                  className="Filter-Value"
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Launch-Filter" id="Launch-Filter">
          <div className="Filter-Name">Successful Launched</div>
          <div className="Filter">
            <div
              className="Filter-Value"
              id="launch_true"
              onClick={(e) => {
                otherfilterFlights(e, true, "launch");
              }}
            >
              True
            </div>
            <div
              className="Filter-Value"
              id="launch_false"
              onClick={(e) => {
                otherfilterFlights(e, false, "launch");
              }}
            >
              False
            </div>
          </div>
        </div>
        <div className="Landing-Filter" id="Landing-Filter">
          <div className="Filter-Name">Successful Landed</div>
          <div className="Filter">
            <div
              className="Filter-Value"
              onClick={(e) => {
                otherfilterFlights(e, true, "landing");
              }}
              id="landing_true"
            >
              True
            </div>
            <div
              className="Filter-Value"
              onClick={(e) => {
                otherfilterFlights(e, false, "landing");
              }}
              id="landing_false"
            >
              False
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
