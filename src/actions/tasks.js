import realm from 'realm';
import shortid from 'shortid';

import todoSchema from '../db/schema';

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
        let fetchedData = realm.objects('Todolist'),
          data = [];
        if (fetchedData.length !== 0) {
          for (let item of fetchedData) {
            data.push({
              key: item.key,
              item: item.item,
              completed: item.completed
            });
          }
        }
        console.log(data);
        dispatch(fetchData(data));
        realm.close();
      })
      .catch((err) => {
        console.log(err);
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
              realm.create('Todolist', data);
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
          realm.write(() => {
            realm.create('Todolist', { key, completed: true }, true);
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
            const itemToDelete = realm.objects('Todolist').filtered(`key = "${key}"`);
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
            const allCompletedItems = realm.objects('Todolist').filtered(`completed = true`);
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
          const data = getState().tasks.prev;
          realm.write(() => {
            console.log('pastdata: ', data);
            realm.create('Todolist', data);
            console.log('restored item');
            dispatch(restoreState());
          });
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
