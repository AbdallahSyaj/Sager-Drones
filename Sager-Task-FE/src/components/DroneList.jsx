import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDrone,
  selectSelected,
  selectAllDrones,
} from "../store/dronesSlice";
import { isAllowed } from "../utils/formatters";

export default function DroneList() {
  const drones = useSelector(selectAllDrones);
  const selected = useSelector(selectSelected);
  const dispatch = useDispatch();

  const sortedDrones = [...drones].sort((a, b) => b.lastTimestamp - a.lastTimestamp);

  return (
    <div className="sidebar">
      <div className="title">DRONE FLYING</div>
      <div className="list">
        {sortedDrones.map((drone) => {
          const isActive = selected === drone.serial;
          const isRegistrationAllowed = isAllowed(drone.registration);

          return (
            <div
              key={drone.serial}
              className={`item ${isActive ? "active" : ""}`}
              onClick={() => dispatch(selectDrone(drone.serial))}
            >
              <div>
                <div style={{ fontWeight: "bold" }}>
                  {drone.name}{" "}
                  <span
                    className={`badge ${isRegistrationAllowed ? "green" : "red"}`}
                  />
                </div>
                <div className="meta">Serial: {drone.serial}</div>
                <div className="meta">Registration: {drone.registration}</div>
                <div className="meta">
                  Pilot: {drone.pilot} . Org: {drone.organization}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
