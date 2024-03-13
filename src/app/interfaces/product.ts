export interface Product {
    title: string,
    imageCover: string,
    id: string,
    price: string,
    ratingsAverage: string,
    category: Category,
    description: string
}

interface Category{
    name: string,
    image: string,
    _id: string
}
