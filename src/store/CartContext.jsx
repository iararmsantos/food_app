//allows us to spread data in all components that is needed
import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  remove: (id) => {},
});

//executed by react automatically
//react passes the arguments
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    //not good to change state directly
    // state.items.push(action.item);
    const existentCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existentCartItemIndex > -1) {
      const existentItem = state.items[existentCartItemIndex];
      const updatedItem = {
        ...existentItem,
        quantity: existentItem.quantity + 1,
      };
      updatedItems[existentCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existentCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existentCartItemIndex];
    const updatedItems = [...state.items];
    if (existentCartItemIndex === 1) {
      updatedItems.splice(existentCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existentCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  //1st parameter: pointer to reducer
  //2nd parameter: initial state value
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
