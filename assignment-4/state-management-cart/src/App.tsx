import ContextCart from "./context/ContextCart";
import {
  CartProvider,
} from "./context/CartContext";

import ReduxCart from "./redux/ReduxCart";
import ZustandCart from "./zustand/ZustandCart";

function App() {
  return (
    <main>
      <h1>E-Commerce Cart</h1>

      <section>
        <CartProvider>
          <ContextCart />
        </CartProvider>
      </section>

      <hr />

      <section>
        <ReduxCart />
      </section>

      <hr />

      <section>
        <ZustandCart />
      </section>
    </main>
  );
}

export default App;