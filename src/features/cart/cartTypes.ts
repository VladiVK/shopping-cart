export type UICartItem = {
  productId: number;
  quantity: number;
};

export type UICartState = {
  isLoading: boolean;
  cartItems: UIProduct[];
  isModal: boolean;
  error: null | string;
  totalSum: number;
  totalQuantity: number;
};

export type UIProductsList = {
  products: { productId: number; quantity: number }[];
};

export type UIProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
};
