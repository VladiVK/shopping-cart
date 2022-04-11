export type ModalState = {
  isOpen?: boolean;
  title: string;
  buttonText: string;
  target: 'button' | 'cart';
  productID?: number | undefined;
};
