export interface IOrder {
    shippingAddress: IShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: IUser
    cartItems: ICartItem[]
    paidAt: string
    createdAt: string
    updatedAt: string
    id: number
    __v: number
}

export interface IShippingAddress {
    details: string
    city: string
    phone: string
}

export interface IUser {
    _id: string
    name: string
    email: string
    phone: string
}

export interface ICartItem {
    count: number
    _id: string
    product: IProduct
    price: number
}

export interface IProduct {
    subcategory: ISubcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    imageCover: string
    category: ICategory
    brand: IBrand
    ratingsAverage: number
    id: string
}

export interface ISubcategory {
    _id: string
    name: string
    slug: string
    category: string
}

export interface ICategory {
    _id: string
    name: string
    slug: string
    image: string
}

export interface IBrand {
    _id: string
    name: string
    slug: string
    image: string
}