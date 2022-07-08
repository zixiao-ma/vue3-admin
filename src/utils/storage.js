const storage = window.localStorage
export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value))
}
export const getItem = (key) => {
  const data = storage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
export const removeItem = (key) => {
  storage.removeItem(key)
}
export const removeStorage = () => {
  storage.clear()
}
