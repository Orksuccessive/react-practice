import {
  useCartStore,
} from "./cartStore";

import {
  products,
} from "../types/cart";

function ZustandCart() {
  const items =
    useCartStore(
      (state) => state.items
    );

  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  const removeItem =
    useCartStore(
      (state) => state.removeItem
    );

  const increase =
    useCartStore(
      (state) => state.increase
    );

  const decrease =
    useCartStore(
      (state) => state.decrease
    );

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Zustand</h2>

      <h3>Products</h3>

      {products.map((product) => (
        <div key={product.id}>
          {product.name} - ₹{product.price}

          <button
            onClick={() =>
              addItem(product)
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
              decrease(item.id)
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
              increase(item.id)
            }
          >
            +
          </button>

          <button
            onClick={() =>
              removeItem(item.id)
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

export default ZustandCart;