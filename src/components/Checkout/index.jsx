import { useContext } from "react";
import UserProgressContext from "../../store/UserProgressContext";
import { currencyFormatter } from "../../util/formatting";
import Modal from "../Modal";
import CartContext from "../../store/CartContext";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useFetch } from "../../hooks/useFetch";
import { createOrder } from "../../http";

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  // const {
  //   isFetching,
  //   error,
  //   fetchedData: meals,
  //   setFetchedData: setMeals,
  // } = useFetch(createOrder, []);

  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    //FormData built in the browse
    //to this work all input should have prop 'name'
    const formData = new FormData(event.target);

    //to access data
    // const enteredEmail = formData.get("email");
    //or
    const customerData = Object.fromEntries(formData.entries());

    //when getting from entries input with the same name will be lost
    const acquisitionChannel = formData.getAll("acquisition");
    customerData.acquisition = acquisitionChannel;

    const customerOrder = {
      order: {
        items: cartContext.items,
        customer: customerData,
      },
    };

    const order = await createOrder(customerOrder);
    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartContext.items,
    //       customer: customerData,
    //     },
    //   }),
    // });
    console.log(order);

    //to reset the data manually
    // event.target.reset();
  };

  function handleClose() {
    userProgressContext.hideCheckout();
  }

  return (
    <Modal
      open={userProgressContext.progress === "checkout"}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input id="name" type="text" name="name" required label="Full Name" />
        <Input
          label="E-mail Address"
          id="email"
          type="email"
          name="email"
          required
        />
        <Input type="text" id="street" name="street" required label="Street" />
        <div className="control-row">
          <Input
            type="text"
            id="postal-code"
            name="postal-code"
            required
            label="Postal Code"
          />
          <Input type="text" id="city" name="city" required label="City" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
