import TaskReducer, { initialState } from '../../src/reducers/reducer_tasks';
import {
	FETCH_DATA,
	ADD_ITEM,
	EDIT_ITEM,
	REMOVE_ITEM,
	REMOVE_COMPLETED,
	RESTORE_STATE
} from '../../src/actions/tasks';
import tasks from '../fixtures/tasks';

test('should set default state', () => {
	const state = TaskReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
});

test('should set data on fetch', () => {
	const action = {
		type: FETCH_DATA,
		data: tasks
	};
	const state = TaskReducer(initialState, action);
	expect(state.data).toEqual(tasks);
});

test('should add data on add item', () => {
	const action = {
		type: ADD_ITEM,
		data: tasks[0]
	};
	const state = TaskReducer(initialState, action);
	expect(state.data).toEqual([tasks[0]]);
});

test('should edit data item on edit item', () => {
	const action = {
		type: EDIT_ITEM,
		key: tasks[0].key
	};
	const modifiedState = { data: tasks, prev: {} };
	const state = TaskReducer(modifiedState, action);
	let expectedValue = tasks[0];
	expectedValue.completed = !expectedValue.completed;
	expect(state.data[0]).toEqual(expectedValue);
	expect(state.data).toEqual([expectedValue, ...tasks.slice(1)])
});

test('should remove data item on remove item', () => {
	const action = {
		type: REMOVE_ITEM,
		key: tasks[0].key
	};
	const modifiedState = { data: tasks, prev: {} };
	const state = TaskReducer(modifiedState, action);
	const expectedValue = tasks.slice(1)
	expect(state.data).toEqual(expectedValue);
	expect(state.prev).toEqual(tasks[0]);
});

test('should remove completed data items on remove completed', () => {
	const action = {
		type: REMOVE_COMPLETED,
	};
	const modifiedState = { data: tasks, prev: {} };
	const state = TaskReducer(modifiedState, action);
	const expectedValue = tasks.filter((task) => {
			return task.completed === false
		});
	expect(state.data).toEqual(expectedValue);
});

test('should restore previously removed item on undo', () => {
	const action = {
		type: RESTORE_STATE
	};
	const prev = {
		key: '4',
		item: 'Restore this',
		completed: true
	};
	const modifiedState = { 
		data: tasks,
		prev
	};
	const state = TaskReducer(modifiedState, action);
	const expectedValue = tasks;
	expectedValue.push(prev);
	expect(state.data).toEqual(expectedValue);
	expect(state.prev).toEqual({});
});