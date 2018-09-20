export default (startAddItem = (text) => {
  return new Promise((resolve, reject) => {
    process.nextTick(() => (text.length > 0 ? resolve() : reject()));
  });
});
