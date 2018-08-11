import { FETCH_DATA, ADD_ITEM, EDIT_ITEM, REMOVE_ITEM, REMOVE_COMPLETED } from '../actions/tasks';

export const initialState = { data: [] };

export default (state = initialState, action) => {
	let data = null;
	switch (action.type) {
		case FETCH_DATA: {
			return {
				...state,
				data: action.data
			}
		}
		case ADD_ITEM:
			data = [...state.data, action.data];

			return {
				...state,
				data
			};
		case EDIT_ITEM:
			data = state.data.map((item) => {
				if (item.key === action.key) {
					item.completed = !item.completed;
				}
				return item;
			});

			return {
				...state,
				data
			};
		case REMOVE_ITEM:
			data = state.data.filter((item) => {
				return item.key !== action.key
			});

			return {
				...state,
				data
			};
		case REMOVE_COMPLETED:
			data = state.data.filter((item) => {
				return item.completed !== true
			});
			
			return {
				...state,
				data
			};
		default:
			return state;
	}
}