export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 70000,
  },
  {
    id: 2,
    name: "Keyboard",
    price: 2500,
  },
  {
    id: 3,
    name: "Mouse",
    price: 1200,
  },
  {
    id: 4,
    name: "Monitor",
    price: 15000,
  },
];