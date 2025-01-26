export interface PRODUCT_FROM_INVENTARY {
    productId: number
    locationId: number
    productName: string
    product_image: string
    totalQuantity: number
    displayQuantity: number
    ecommerceQuantity: number
    categoryId: number
    categoryName: string
    locationAddress: string
    price: number
}

export interface POS_ADDED_PRODUCT {
    product: PRODUCT_FROM_INVENTARY
    subtotal: number
}