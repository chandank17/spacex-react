import React from "react";
import "../style.scss";
import { useSelector } from "react-redux";

const Flights = () => {
  const fullflightList = useSelector((state) => state.allflights);
  const { filteredflightList, loading } = fullflightList;

  return (
    <div className="Container-Flights">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : filteredflightList.length > 0 ? (
        <div>
          <div className="Flight-Container">
            {filteredflightList.map((value, index) => {
              return (
                <div className="Flight-Details" key={index}>
                  <div className="Fligt-Img">
                    <div>
                      <img
                        src={value.links.mission_patch_small}
                        alt={value.mission_name}
                      />
                    </div>
                  </div>
                  <div className="mission-name">{value.mission_name}</div>
                  <div className="mission-ids">
                    <div>Mission Id&nbsp;:&nbsp;</div>

                    {value.mission_id.length > 0 ? (
                      <ul>
                        {value.mission_id.map((id) => {
                          return (
                            <li key={id} className="mession-id">
                              {id}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div>No Misson Ids</div>
                    )}
                  </div>
                  <ul className="ul-list">
                    <li>
                      <div>Lauch Year &nbsp;:&nbsp;</div>
                      <div>{value.launch_year}</div>
                    </li>
                    <li>
                      <div> Successful Launch&nbsp;:&nbsp;</div>
                      {value.launch_success ? (
                        <div>True</div>
                      ) : (
                        <div>False</div>
                      )}
                    </li>
                    <li>
                      <div>Successful Landing&nbsp;:&nbsp;</div>
                      {value.rocket.first_stage.cores[0].land_success ? (
                        <div>True</div>
                      ) : (
                        <div>False</div>
                      )}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="no-result-found">No Result found</div>
      )}
    </div>
  );
};

export default Flights;
