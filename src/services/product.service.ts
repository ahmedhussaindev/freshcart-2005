export async function getProducts() {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
        cache: 'force-cache'
    })

    if (!response.ok) {
        throw new Error(`${response.status} there is an error`)
    }

    const data = await response.json()

    return data.data
}

export async function getProductsDetails(prodId:string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${prodId}`, {
        cache: 'force-cache',
        next:{revalidate:60*60}
    })

    if (!response.ok) {
        throw new Error(`${response.status} there is an error`)
    }

    const data = await response.json()

    return data.data
}