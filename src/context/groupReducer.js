import { v4 as uuidv4 } from 'uuid';

export const groupReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GROUP':
      return [...state, {
        groupName: action.group.groupName,
        sensors: action.group.newGroup, 
        id: uuidv4()
      }
      ]
    case 'REMOVE_GROUP':
      return state.filter(group => group.id !== action.id);

      case 'CHANGE_GROUP_NAME':
        return {...state, title: action.value};
   
        default:
      return state;
  }
} 