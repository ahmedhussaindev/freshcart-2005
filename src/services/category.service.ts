export async function getCategories() {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
        cache: 'force-cache'
    })

    if (!response.ok) {
        throw new Error(`${response.status} there is an error`)
    }

    const data = await response.json()

    return data.data
}

export async function getCategoryDetails(categoryId: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)

    if (!response.ok) {
        throw new Error(`${response.status} there is an error`)
    }

    const data = await response.json()
    
    return data.data
}

export async function getProductsByCategory(categoryId: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)

    if (!response.ok) {
        throw new Error(`${response.status} there is an error`)
    }

    const data = await response.json()

    return data.data
}