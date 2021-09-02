module.exports = function removeIgnored(str, ignored) {
  let newstr = '';
  newstr = str;

  for (let i = 0; i < ignored.length; i++) {
    newstr = newstr.replace(ignored[i], '')
  }

  return newstr;
}