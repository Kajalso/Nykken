import { v4 as uuidv4 } from 'uuid';

export const groupReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GROUP':
      return [...state, {
        sensors: action.group.newGroup, 
        //id: uuidv4()
      }
      ]
    case 'REMOVE_GROUP':
      return state.filter(group => group.id !== action.id);
    default:
      return state;
  }
} 