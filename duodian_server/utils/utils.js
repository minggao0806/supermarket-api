const renderData = (array) => {
  const newArr = array.map((item) => {
    return {...item}
  })
  return newArr
}

const arrayToTree = (arr) => {
  const data = [];
  const obj = {}
  arr.forEach((item) => {
    obj[item.categoryId] = item
  })
  for(let k in obj) {
    const parent = obj[obj[k].parentId]
    if (parent) {
      if (parent.children) {
        parent.children.push(obj[k])
      } else {
        parent.children = [obj[k]]
      }
    } else {
      data.push(obj[k])
    }
  }
  return data
}

const getChildrenId = (arr, id) => {
  let ids = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item.categoryId == id) {
      if (item.children) {
        item.children.forEach((el) => {
          ids = ids.concat(getChildrenId(item.children, el.categoryId))
        })
      } else {
        ids.push(item.categoryId)
        break;
      }
    } else if (item.children) {
      ids = ids.concat(getChildrenId(item.children, id))
    }
  }
  return ids
}

const turnFood = (arr) => {
  arr.forEach((el) => {
    
  })
}

module.exports = {
  renderData,
  arrayToTree,
  getChildrenId
}