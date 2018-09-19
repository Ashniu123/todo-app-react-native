export default (todoSchema = {
  name: 'Todolist',
  primaryKey: 'key',
  properties: {
    key: 'string',
    item: 'string',
    completed: { type: 'bool', default: false }
  }
});
