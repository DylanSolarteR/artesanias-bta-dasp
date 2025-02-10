export interface PRODUCT_FROM_INVENTARY {
    productId: number
    locationId: number
    productName: string
    productImage: string
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
    quantity: number
    subtotal: number
}

export interface UPDATE_PRODUCT_INVENTORY {
    productId: number
    physicalLocationId: number
    quantity: number
    displayQuantity: number
}