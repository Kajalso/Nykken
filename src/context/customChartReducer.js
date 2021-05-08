import { v4 as uuidv4 } from "uuid";

export const customChartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CUSTOM_CHART":
      return [
        ...state,
        {
          customChartName: action.customChart.chartName,
          sensors: action.customChart.newChart,
          id: uuidv4(),
        },
      ];
    case "REMOVE_CUSTOM_CHART":
      return state.filter((customChart) => customChart.id !== action.id);

    case "CHANGE_CUSTOM_CHART_NAME":
      return { ...state, title: action.value };

    default:
      return state;
  }
};
