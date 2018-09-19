import {
  FETCH_DATA,
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
  REMOVE_COMPLETED,
  RESTORE_STATE
} from '../actions/tasks';

export const initialState = { data: [], prev: {} };

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
      // const prev = JSON.parse(JSON.stringify(state.data));
      const data = state.data.filter((item) => {
        return item.key !== action.key;
      });
      const prev = state.data.filter((item) => {
        return item.key === action.key;
      })[0];
      return {
        ...state,
        data,
        prev
      };
    }
    case REMOVE_COMPLETED: {
      // const prev = JSON.parse(JSON.stringify(state.data));
      const data = state.data.filter((item) => {
        return item.completed !== true;
      });
      return {
        ...state,
        data
        // prev
      };
    }
    case RESTORE_STATE: {
      // const data = JSON.parse(JSON.stringify(state.prev));
      const prevData = JSON.parse(JSON.stringify(state.prev));
      const data = [...state.data, prevData];
      return {
        ...state,
        data,
        prev: {}
      };
    }
    default:
      return state;
  }
};
