import React, { createContext, useReducer, useEffect } from "react";
import { customChartReducer } from "./customChartReducer";

export const CustomChartsContext = createContext();

const CustomChartsContextProvider = (props) => {
  const [customCharts, dispatch] = useReducer(customChartReducer, [], () => {
    const localData = localStorage.getItem("CustomCharts");
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem("CustomCharts", JSON.stringify(customCharts));
  }, [customCharts]);
  return (
    <CustomChartsContext.Provider value={{ customCharts, dispatch }}>
      {props.children}
    </CustomChartsContext.Provider>
  );
};

export default CustomChartsContextProvider;
