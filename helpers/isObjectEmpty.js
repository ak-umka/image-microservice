export function isObjectEmpty(obj) {
  //  Object.prototype.toString.call(obj) === '[object Object]' // check if obj is object 
  //  JSON.stringify(obj) === '{}' // check if obj is empty object
  return Object.prototype.toString.call(obj) === '[object Object]' && JSON.stringify(obj) === '{}'
}