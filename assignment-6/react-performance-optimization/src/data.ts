export interface Item {
  id: number;
  name: string;
}

export const items: Item[] = Array.from(
  { length: 10000 },
  (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  })
);