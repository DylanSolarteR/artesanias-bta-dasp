export interface CartItem {
    productId: number;
    quantity: number;
}

export interface CartContextType {
    cart: CartItem[];
    sessionId: string;
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: number) => void;
    flushCart: () => void;
}
