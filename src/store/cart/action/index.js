export const addFood = (add) => {
    return {
      type: 'ADD_FOOD',
      add
    }
  }
  
  export const removeFood = (remove) => {
    return {
      type: 'REMOVE_FOOD',
      remove
    }
  }