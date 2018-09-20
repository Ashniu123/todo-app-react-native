import realm from 'realm';
import shortid from 'shortid';

import todoSchema from '../db/schema';
const DBName = 'Todolist';

export const FETCH_DATA = 'FETCH_DATA';
export const ADD_ITEM = 'ADD_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REMOVE_COMPLETED = 'REMOVE_ALL';
export const RESTORE_STATE = 'RESTORE_STATE';

export const fetchData = (data) => ({
  type: FETCH_DATA,
  data
});

export const startFetchData = () => {
  return (dispatch) => {
    realm
      .open({ schema: [todoSchema] })
      .then((realm) => {
        try {
          const fetchedData = realm.objects(DBName);
          const data = [];
          for (let i = 0; i < fetchedData.length; i += 1) {
            const item = fetchedData[i];
            data.push({
              key: item.key,
              item: item.item,
              completed: item.completed
            });
          }
          console.log(data);
          dispatch(fetchData(data));
        } catch (e) {
          console.log('Error on fetching data');
        } finally {
          realm.close();
        }
      })
      .catch((err) => {
        console.log('Error fetching!');
      });
  };
};

export const addItem = (data) => ({
  type: ADD_ITEM,
  data
});

export const startAddItem = (item) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      realm
        .open({ schema: [todoSchema] })
        .then((realm) => {
          try {
            const data = {
              key: shortid.generate(),
              item,
              completed: false
            };
            realm.write(() => {
              realm.create(DBName, data);
              console.log('created item');
              dispatch(addItem(data));
              resolve();
            });
          } catch (e) {
            reject('Error on create!');
          } finally {
            realm.close();
          }
        })
        .catch((err) => {
          console.log('Error creating!');
        });
    });
  };
};

export const editItem = (key) => ({
  type: EDIT_ITEM,
  key
});

export const startEditItem = (key) => {
  return (dispatch) => {
    realm
      .open({ schema: [todoSchema] })
      .then((realm) => {
        try {
          const itemToUpdate = realm
            .objects(DBName)
            .filtered(`key = "${key}"`)
            .snapshot();
          realm.write(() => {
            realm.create(DBName, { key, completed: !itemToUpdate.completed }, true);
            console.log('updated item');
            dispatch(editItem(key));
          });
        } catch (e) {
          console.log('Error on edit!');
        } finally {
          realm.close();
        }
      })
      .catch((err) => {
        console.log('Error editing!');
      });
  };
};

export const removeItem = (key) => ({
  type: REMOVE_ITEM,
  key
});

export const startRemoveItem = (key) => {
  return (dispatch) => {
    realm
      .open({ schema: [todoSchema] })
      .then((realm) => {
        try {
          realm.write(() => {
            const itemToDelete = realm.objects(DBName).filtered(`key = "${key}"`);
            realm.delete(itemToDelete);
            console.log('deleted item');
            dispatch(removeItem(key));
          });
        } catch (e) {
          console.log('Error on removing one!');
        } finally {
          realm.close();
        }
      })
      .catch((err) => {
        console.log('Error Removing!');
      });
  };
};

export const removeCompleted = () => ({
  type: REMOVE_COMPLETED
});

export const startRemoveCompleted = () => {
  return (dispatch) => {
    realm
      .open({ schema: [todoSchema] })
      .then((realm) => {
        try {
          realm.write(() => {
            const allCompletedItems = realm.objects(DBName).filtered('completed = true');
            realm.delete(allCompletedItems);
            console.log('deleted all completed');
            dispatch(removeCompleted());
          });
        } catch (e) {
          console.log('Error on removing all!');
        } finally {
          realm.close();
        }
      })
      .catch((err) => {
        console.log('Error Removing all!');
      });
  };
};

export const restoreState = () => ({
  type: RESTORE_STATE
});

export const startRestoreState = () => {
  return (dispatch, getState) => {
    realm
      .open({ schema: [todoSchema] })
      .then((realm) => {
        try {
          const dataToRestore = getState().tasks.prev;
          realm.beginTransaction();
          for (let i = 0; i < dataToRestore.length; i += 1) {
            realm.create(DBName, dataToRestore[i]);
          }
          realm.commitTransaction();
          dispatch(restoreState());
        } catch (e) {
          console.log('Error on restoring state!');
        } finally {
          realm.close();
        }
      })
      .catch((err) => {
        console.log('Error Restoring state');
      });
  };
};
