import { useCart } from "./CartContext";
import { products } from "../types/cart";

export default function ContextCart() {
  const { state, dispatch } = useCart();

  const total = state.items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Context API + useReducer</h2>

      <h3>Products</h3>

      {products.map((product) => (
        <div key={product.id}>
          {product.name} - ₹{product.price}

          <button
            onClick={() =>
              dispatch({
                type: "ADD_ITEM",
                payload: product,
              })
            }
          >
            Add
          </button>
        </div>
      ))}

      <h3>Cart</h3>

      {state.items.map((item) => (
        <div key={item.id}>
          <strong>{item.name}</strong>

          <button
            onClick={() =>
              dispatch({
                type: "DECREASE",
                payload: item.id,
              })
            }
          >
            -
          </button>

          <span> {item.quantity} </span>

          <button
            onClick={() =>
              dispatch({
                type: "INCREASE",
                payload: item.id,
              })
            }
          >
            +
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "REMOVE_ITEM",
                payload: item.id,
              })
            }
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}