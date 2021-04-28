import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  currentSensors: localStorage.getItem("sensors")
    ? JSON.parse(localStorage.getItem("sensors"))
    : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("sensors", JSON.stringify(state.sensors));
  }, [state]);

  // actions
  const addSensorToSensorlist = (sensor) => {
    dispatch({ type: "ADD_SENSOR_TO_SENSORLIST", payload: sensor });
  };

  const removeSensorFromSensorList = (id) => {
    dispatch({ type: "REMOVE_SENSOR_FROM_SENSORLIST", payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        sensors: state.sensors,
        addSensorToSensorlist,
        removeSensorFromSensorList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};