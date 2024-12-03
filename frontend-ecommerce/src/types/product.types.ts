export interface PRODUCT {
    stock: number
    name: string
    description: string
    categoryName: string
    categoryId: number
    price: number
    img: string
    isActive: boolean
    _id: number
}

export interface POS_ADDED_PRODUCT {
    product: PRODUCT
    subtotal: number
}