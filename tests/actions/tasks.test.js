import {
  fetchData,
  FETCH_DATA,
  addItem,
  ADD_ITEM,
  editItem,
  EDIT_ITEM,
  removeItem,
  REMOVE_ITEM,
  removeCompleted,
  REMOVE_COMPLETED,
  restoreState,
  RESTORE_STATE
} from '../../src/actions/tasks';
import tasks from '../fixtures/tasks';

test('should generate fetch action correctly', () => {
  const action = fetchData(tasks);
  expect(action).toEqual({
    type: FETCH_DATA,
    data: tasks
  });
});

test('should generate add action correctly', () => {
  const data = tasks[0];
  const action = addItem(data);
  expect(action).toEqual({
    type: ADD_ITEM,
    data
  });
});

test('should generate edit action correctly', () => {
  const key = tasks[0].key;
  const action = editItem(key);
  expect(action).toEqual({
    type: EDIT_ITEM,
    key
  });
});

test('should generate remove action correctly', () => {
  const key = tasks[0].key;
  const action = removeItem(key);
  expect(action).toEqual({
    type: REMOVE_ITEM,
    key
  });
});

test('should generate remove completed action correctly', () => {
  const action = removeCompleted();
  expect(action).toEqual({
    type: REMOVE_COMPLETED
  });
});

test('should generate restore state action correctly', () => {
  const action = restoreState();
  expect(action).toEqual({
    type: RESTORE_STATE
  });
});
