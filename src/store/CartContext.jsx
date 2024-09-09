//allows us to spread data in all components that is needed
import { createContext, useReducer } from "react";

/**
 * Create a context with default values
 */
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  remove: (id) => {},
  clearCart: () => {},
});

//executed by react automatically
//react passes the arguments
/**
 * add or remove items in the cart
 *
 * @param   {state} .
 * @param   {action} how to update the state, can be "ADD_ITEM", "REMOVE_ITEM".
 * @returns updated state.
 */
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    //not good to change state directly
    //state.items.push(action.item);
    //instead
    //create a copy of state
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

    if (existingCartItem.quantity === 1) {
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

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

/**
 * Create logic to save cart items to be used by wrapped components components without pass props
 *
 * @param {children} components that will be wrapped by this context provider
 * @returns CartContext.Provider from react
 */
export function CartContextProvider({ children }) {
  /**
   * useReducer:
   *
   * @param {cartReducer} pointer to reducer
   * @param {{item}} initial state value
   */
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  //call cartReducer
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
