import React, { useEffect } from "react";
import "./style.scss";
import Filter from "./Components/Filter";
import Flights from "./Components/Flights";
import { useSelector, useDispatch } from "react-redux";
import { getFlightList } from "./Actions/Actions";
import { ReactComponent as Logo } from "./spacexlogo.svg";

function App() {
  const fullflightList = useSelector((state) => state.allflights);
  const { loading } = fullflightList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlightList());
  }, []);

  return (
    <div>
      {!loading ? (
        <div>
          <div className="Heading">SpaceX A Launch Programs</div>
          <div className="Content-div">
            <Filter></Filter>
            <Flights></Flights>
          </div>
          <div className="developer-name">
            <b>Developed By : </b> Chandan K
          </div>
        </div>
      ) : (
        <div className="loading">
          <Logo />
        </div>
      )}
    </div>
  );
}

export default App;
