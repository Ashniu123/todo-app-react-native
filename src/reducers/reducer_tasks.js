import {
  FETCH_DATA,
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
  REMOVE_COMPLETED,
  RESTORE_STATE
} from '../actions/tasks';

export const initialState = { data: [], prev: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      return {
        ...state,
        data: action.data
      };
    }
    case ADD_ITEM: {
      const data = [...state.data, action.data];

      return {
        ...state,
        data
      };
    }
    case EDIT_ITEM: {
      const data = state.data.map((item) => {
        if (item.key === action.key) {
          item.completed = !item.completed;
        }
        return item;
      });

      return {
        ...state,
        data
      };
    }
    case REMOVE_ITEM: {
      const data = state.data.filter((item) => {
        return item.key !== action.key;
      });
      const prev = state.data.filter((item) => {
        return item.key === action.key;
      });
      return {
        ...state,
        data,
        prev
      };
    }
    case REMOVE_COMPLETED: {
      const data = state.data.filter((item) => {
        return item.completed !== true;
      });
      const prev = state.data.filter((item) => {
        return item.completed === true;
      });
      return {
        ...state,
        data,
        prev
      };
    }
    case RESTORE_STATE: {
      const data = [...state.data, ...state.prev];
      return {
        ...state,
        data,
        prev: initialState.prev
      };
    }
    default:
      return state;
  }
};
