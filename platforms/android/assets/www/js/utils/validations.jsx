export const localStorageSetArray = (key, obj) => {
  return window.localStorage.setItem(key, JSON.stringify(obj))
}

export const localStorageGetArray = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const localStorageUpdateArrayItem = (arrayKey, itemId, itemNewValue) => {
  let _arr = JSON.parse(window.localStorage.getItem(arrayKey))

  for (let i=0; i < _arr.length; i++) {
    if (_arr[i].id === itemId) {
      _arr[i] = itemNewValue;
      break;
    }
  }
  return window.localStorage.setItem(arrayKey, JSON.stringify(_arr))
}
