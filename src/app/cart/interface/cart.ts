export interface Cart {
    product: any
    numOfCartItems: number,
    data : Data,
}

interface Data{
    totalCartPrice: number,
    products: Product[],
    _id: string
}

interface Product{
count: number,
price: number,
product: InnerProduct
}

interface InnerProduct{
title: string,
imageCover : string,
category: Category,
id: string
}

interface Category{
    name: string,
}
