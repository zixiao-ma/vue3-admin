export const getParentMenu = (routes) => {
  return routes.filter(item => {
    return item.children && item.children.length > 0
  })
}

function isNull (data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

export const getMenus = (routes) => {
  const result = []
  routes.forEach(item => {
    if (isNull(item.meta) && isNull(item.children)) return
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...getMenus(item.children))
    }
    let route = result.find(value => item.path === value.path)
    if (!route) {
      route = {
        ...item,
        children: [],
        path: item.path
      }
      if (item.meta.title && item.meta.icon) {
        result.push(route)
      }
    }
    if (item.children) {
      route.children.push(...getMenus(item.children))
    }
  })
  console.log(result)
  return result
}
