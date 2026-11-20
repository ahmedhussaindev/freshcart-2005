export async function getBrands() {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
    const payload = await response.json()
    return payload
}

export async function getBrandDetails(brandId: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
    const payload = await response.json()
    return payload
}

export async function getProductsByBrand(brandId: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
    return await response.json()
}