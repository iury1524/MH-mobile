export const localStorageSetArray = (key, obj) => {
  return window.localStorage.setItem(key, JSON.stringify(obj))
}

export const localStorageGetArray = (key) => {
  if( window.localStorage.getItem(key) === undefined ||
      window.localStorage.getItem(key) === null ) {
        localStorageSetArray( key, [] )
  }
  return JSON.parse(window.localStorage.getItem(key))
}

export const localStorageUpdateArrayItem = (arrayKey, itemId, itemNewValue) => {
  let _arr = JSON.parse(window.localStorage.getItem(arrayKey))
  for (let i=0; i < _arr.length; i++) {
    if (_arr[i].id === parseInt(itemId)) {
      _arr[i] = itemNewValue;
      break;
    }
  }
  return window.localStorage.setItem(arrayKey, JSON.stringify(_arr))
}

export const localStorageClear = () => {
  window.localStorage.clear()
}

export const localStorageRemoveKey = (key) => {
  window.localStorage.removeItem(key)
}

export const localStorageGetItemByItemId = (arrayKey, itemId) => {
  let _arr = JSON.parse(window.localStorage.getItem(arrayKey))
  let _return = {}
  for (let i=0; i < _arr.length; i++) {
    if (_arr[i].id.toString() === itemId.toString()) {
      _return = _arr[i]
    }
  }
  return _return
}

export const localStorageRemoveItemByItemId = (arrayKey, itemId) => {
  let _arr = JSON.parse(window.localStorage.getItem(arrayKey))
  let _return = []
  for (let i=0; i < _arr.length; i++) {
    if (_arr[i].id.toString() !== itemId.toString()) {
      _return.unshift(_arr[i])
    }
  }
  window.localStorage.setItem(arrayKey, JSON.stringify(_return))
  return true
}

export const getNextId = ( _array ) => {
  if(_array.length === 0) {
    return 1
  }
  let _maxID = _array[0].id
  for (let i=1; i < _array.length; i++) {
    if (_array[i].id > _maxID) {
      _maxID = _array[i].id
    }
  }
  return _maxID + 1
}
