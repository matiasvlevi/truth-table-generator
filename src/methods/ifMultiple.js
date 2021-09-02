module.exports = function ifMultiple(item, list) {
  for (let i = 0; i < list.length; i++) {
    if (item === list[i]) {
      return true;
    }
  }
  return false;
}