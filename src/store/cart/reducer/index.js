export const ADD_FOOD = 'ADD_FOOD';
export const REMOVE_FOOD = 'REMOVE_FOOD';

export const INITIAL_STATE = [
  { id: 1, "foodName": "Chicken Burrito", "price": 10.50, quantity: 0 },
  { id: 2, "foodName": "Steak Burrito", "price": 12.00, quantity: 0 },
  { id: 3, "foodName": "Carnitas Burrito", "price": 8.50, quantity: 0 },
  { id: 4, "foodName": "Barbacoa Burrito", "price": 7.50, quantity: 0 },
  { id: 5, "foodName": "Chorizo Burrito", "price": 18.10, quantity: 0 },
  { id: 6, "foodName": "Sofritas Burrito", "price": 19.10, quantity: 0 },
  { id: 7, "foodName": "Eggs Burrito", "price": 23.50, quantity: 0 }
];

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'REMOVE_FOOD':
      return [...state];
      
    case 'ADD_FOOD':
      return [...state];
    
    default:
      return state;
  }
};