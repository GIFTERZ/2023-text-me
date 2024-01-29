interface CopyObject {
  [key: string]: any;
}
function deepCopy(obj: CopyObject) {
  var clone: CopyObject = {};
  for (var key in obj) {
    if (
      typeof obj[key] == "object" &&
      obj[key] != null &&
      !(obj[key] instanceof RegExp)
    ) {
      clone[key] = deepCopy(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }

  return clone;
}

export default deepCopy;
