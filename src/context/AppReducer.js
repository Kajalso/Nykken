  
export default (state, action) => {
    switch (action.type) {
      case "ADD_SENSOR_TO_GROUP":
        return {
          ...state,
          groupr: [action.payload, ...state.sensors],
        };
  }};