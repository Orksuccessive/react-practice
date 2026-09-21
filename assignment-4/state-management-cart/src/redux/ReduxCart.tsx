import {
  useDispatch,
  useSelector,
} from "react-redux";

import type {
  RootState,
} from "./store";

import {
  addItem,
  removeItem,
  increase,
  decrease,
} from "./cartSlice";

import { products } from "../types/cart";

export default function ReduxCart() {
  const dispatch = useDispatch();

  const items = useSelector(
    (state: RootState) =>
      state.cart.items
  );

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Redux Toolkit</h2>

      <h3>Products</h3>

      {products.map((product) => (
        <div key={product.id}>
          {product.name} - ₹{product.price}

          <button
            onClick={() =>
              dispatch(addItem(product))
            }
          >
            Add
          </button>
        </div>
      ))}

      <h3>Cart</h3>

      {items.map((item) => (
        <div key={item.id}>
          <strong>{item.name}</strong>

          <button
            onClick={() =>
              dispatch(decrease(item.id))
            }
          >
            -
          </button>

          <span>
            {" "}
            {item.quantity}{" "}
          </span>

          <button
            onClick={() =>
              dispatch(increase(item.id))
            }
          >
            +
          </button>

          <button
            onClick={() =>
              dispatch(
                removeItem(item.id)
              )
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

