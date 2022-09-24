function ImmutableList(items, initializer) {
  const simpleGet = () => Object.freeze(items.map(Object.freeze));
  const initializerGet = () => Object.freeze([Object.freeze(initializer())]);
  const get = function() {
    if(items && items.length > 0) {
      return simpleGet();
    } else if(initializer) {
      return initializerGet();
    } else {
      return [];
    }
  }
  const add = function(newItem) {
    return ImmutableList([...items, newItem]);
  }
  const remove = function(index) {
    if(items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      return ImmutableList(newItems);
    } else {
      return this;
    }
  }

  const change = function(targetIndex, prop, newValue) {
    const updatedItems = items.map((item, itemIndex) => {
      if (itemIndex === targetIndex) {
        const updatedItem = {...item};
        updatedItem[prop] = newValue;
        return updatedItem;
      } else {
        return item;
      }
    });
    return ImmutableList(updatedItems);
  }

  return Object.freeze({
    get,
    add,
    remove,
    change
  });
}

export default ImmutableList;