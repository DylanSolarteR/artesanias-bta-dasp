export interface PRODUCT {
    name: string
    description: string
    categoryName: string
    categoryId: number
    baseProductId: number
    price: number
    img: string
    isActive: boolean
    _id: number
    stock: number
}

export interface POS_ADDED_PRODUCT {
    product: PRODUCT
    subtotal: number
}